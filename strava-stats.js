// strava-stats.js
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const refreshToken = import.meta.env.VITE_REFRESH_TOKEN;

const authEndpoint = 'https://www.strava.com/oauth/token';
const apiEndpoint = 'https://www.strava.com/api/v3/athlete/activities';

async function getAccessToken() {
  const response = await fetch(authEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) throw new Error('Failed to refresh access token');

  const data = await response.json();
  return data.access_token;
}

async function getYearlyStats(accessToken) {
  const response = await fetch(`${apiEndpoint}?per_page=200`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) throw new Error('Failed to fetch activities');

  const activities = await response.json();
  const currentYear = new Date().getFullYear();

  return activities
    .filter((activity) => new Date(activity.start_date).getFullYear() === currentYear)
    .reduce(
      (stats, activity) => {
        if (activity.type === 'Run') stats.running += activity.distance;
        if (activity.type === 'Swim') stats.swimming += activity.distance;
        if (activity.type === 'Ride') stats.cycling += activity.distance;
        return stats;
      },
      { running: 0, swimming: 0, cycling: 0 }
    );
}

window.initializeStats = async function () {
  try {
    const accessToken = await getAccessToken();
    const stats = await getYearlyStats(accessToken);
    document.getElementById('running-distance').textContent = `${(stats.running / 1000).toFixed(2)} km`;
    document.getElementById('swimming-distance').textContent = `${(stats.swimming / 1000).toFixed(2)} km`;
    document.getElementById('cycling-distance').textContent = `${(stats.cycling / 1000).toFixed(2)} km`;
  } catch (error) {
    console.error(error);
  }
};