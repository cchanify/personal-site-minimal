// Year-to-date running, cycling and swimming distance (metres) from Strava.
// Responses are cached on Netlify's CDN for an hour, so Strava is called rarely.

const SPORTS = {
  running: ['Run', 'TrailRun', 'VirtualRun'],
  cycling: ['Ride', 'GravelRide', 'MountainBikeRide', 'VirtualRide', 'EBikeRide'],
  swimming: ['Swim'],
};

const json = (statusCode, body, headers = {}) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...headers },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });

  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env;
  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    console.error('Missing Strava environment variables');
    return json(500, { error: 'Service temporarily unavailable' });
  }

  try {
    const authResponse = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });
    if (!authResponse.ok) {
      console.error('Strava token refresh failed:', authResponse.status);
      return json(500, { error: 'Service temporarily unavailable' });
    }
    const auth = await authResponse.json();
    if (auth.refresh_token && auth.refresh_token !== STRAVA_REFRESH_TOKEN) {
      console.warn('Strava issued a new refresh token; update STRAVA_REFRESH_TOKEN in Netlify.');
    }

    const year = new Date().getUTCFullYear();
    const after = Date.UTC(year, 0, 1) / 1000;
    const stats = { running: 0, cycling: 0, swimming: 0 };

    for (let page = 1; ; page++) {
      const res = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200&page=${page}`,
        { headers: { Authorization: `Bearer ${auth.access_token}` } },
      );
      if (!res.ok) {
        console.error('Strava activities request failed:', res.status);
        return json(500, { error: 'Service temporarily unavailable' });
      }
      const activities = await res.json();
      for (const { sport_type, distance } of activities) {
        for (const [sport, types] of Object.entries(SPORTS)) {
          if (types.includes(sport_type)) stats[sport] += distance;
        }
      }
      if (activities.length < 200) break;
    }

    return json(200, { year, ...stats }, {
      'Netlify-CDN-Cache-Control': 'public, durable, max-age=3600, stale-while-revalidate=86400',
    });
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return json(500, { error: 'Service temporarily unavailable' });
  }
};
