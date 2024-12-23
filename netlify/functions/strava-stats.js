const fetch = require('node-fetch');

exports.handler = async () => {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  const authEndpoint = 'https://www.strava.com/oauth/token';
  const apiEndpoint = 'https://www.strava.com/api/v3/athlete/activities';

  try {
    // Fetch a new access token
    const authResponse = await fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch access token', details: authData }),
      };
    }

    const accessToken = authData.access_token;

    // Fetch activities for the current year
    const activitiesResponse = await fetch(`${apiEndpoint}?per_page=200`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const activities = await activitiesResponse.json();

    if (!activitiesResponse.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch activities', details: activities }),
      };
    }

    // Filter and summarize stats
    const currentYear = new Date().getFullYear();
    const stats = { running: 0, swimming: 0, cycling: 0 };

    activities
      .filter(activity => new Date(activity.start_date).getFullYear() === currentYear)
      .forEach(activity => {
        if (activity.type === 'Run') stats.running += activity.distance;
        if (activity.type === 'Swim') stats.swimming += activity.distance;
        if (activity.type === 'Ride') stats.cycling += activity.distance;
      });

    return {
      statusCode: 200,
      body: JSON.stringify(stats),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: error.message }),
    };
  }
};
