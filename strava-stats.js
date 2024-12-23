// import 'dotenv/config'; // Load environment variables from .env

const clientId = process.env.CLIENT_ID; // Use environment variable for Client ID
const clientSecret = process.env.CLIENT_SECRET; // Use environment variable for Client Secret
const refreshToken = process.env.REFRESH_TOKEN; // Use environment variable for Refresh Token
const authEndpoint = 'https://www.strava.com/oauth/token';
const apiEndpoint = 'https://www.strava.com/api/v3/athlete/activities';

// Fetch new access token using the refresh token
async function getAccessToken() {
  console.log("Refreshing access token...");
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

  if (!response.ok) {
    console.error('Failed to refresh access token:', await response.text());
    throw new Error('Failed to refresh access token');
  }

  const data = await response.json();
  console.log("Access token refreshed:", data.access_token);
  return data.access_token;
}

async function getYearlyStats(accessToken) {
  console.log("Fetching yearly stats...");
  const response = await fetch(`${apiEndpoint}?per_page=200`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    console.error('Failed to fetch activities:', await response.text());
    throw new Error('Failed to fetch activities');
  }

  const activities = await response.json();
  console.log("Activities fetched:", activities);

  // Process yearly activities
  const currentYear = new Date().getFullYear();
  const yearlyActivities = activities.filter(activity =>
    new Date(activity.start_date).getFullYear() === currentYear
  );

  const stats = { running: 0, swimming: 0, cycling: 0 };
  yearlyActivities.forEach(activity => {
    if (activity.type === 'Run') stats.running += activity.distance;
    if (activity.type === 'Swim') stats.swimming += activity.distance;
    if (activity.type === 'Ride') stats.cycling += activity.distance;
  });

  console.log("Yearly stats calculated:", stats);
  return stats;
}

// Render stats in HTML
function renderStats(stats) {
  document.getElementById('running-distance').textContent = `${(stats.running / 1000).toFixed(2)} km`;
  document.getElementById('swimming-distance').textContent = `${(stats.swimming / 1000).toFixed(2)} km`;
  document.getElementById('cycling-distance').textContent = `${(stats.cycling / 1000).toFixed(2)} km`;
}

// Main function to initialize stats
async function initializeStats() {
  try {
    const accessToken = await getAccessToken(); // Fetch a fresh token
    const stats = await getYearlyStats(accessToken);
    renderStats(stats);
  } catch (error) {
    console.error('Error initializing stats:', error);
  }
}

// Example usage:
// Call initializeStats to fetch and display stats
initializeStats();
