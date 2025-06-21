import fetch from 'node-fetch';

export const handler = async () => {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

  const authEndpoint = 'https://www.strava.com/oauth/token';
  const apiEndpoint = 'https://www.strava.com/api/v3/athlete/activities';

  try {
    console.log("Fetching access token...");
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
      console.error("Auth Error:", authData);
      console.error("Auth Error:", authData);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch access token' }),
      };
    }

    console.log("Access token fetched successfully");

    const activitiesResponse = await fetch(`${apiEndpoint}?per_page=200`, {
      headers: { Authorization: `Bearer ${authData.access_token}` },
    });

    const activities = await activitiesResponse.json();

    if (!activitiesResponse.ok) {
      console.error("Activities Error:", activities);
      console.error("Activities Error:", activities);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch activities' }),
      };
    }

    console.log("Activities fetched successfully, count:", activities.length);

    const currentYear = new Date().getFullYear();
    const stats = { running: 0, swimming: 0, cycling: 0 };

    activities
      .filter(activity => new Date(activity.start_date).getFullYear() === currentYear)
      .forEach(activity => {
        if (activity.type === 'Run') stats.running += activity.distance;
        if (activity.type === 'Swim') stats.swimming += activity.distance;
        if (activity.type === 'Ride') stats.cycling += activity.distance;
      });

    console.log("Yearly stats calculated:", stats);

    return {
      statusCode: 200,
      body: JSON.stringify(stats),
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Service temporarily unavailable' }),
    };
  }
};
