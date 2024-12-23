// Strava API Yearly Stats Display
// Replace placeholders with your own Strava app credentials

// const clientId = '143350';
// const clientSecret = 'e05c14aaa69b372525ad9669c9bc49759caa95e0';
// const redirectUri = 'https://connorhanify.com'; // Your authorization callback domain
// const authEndpoint = 'https://www.strava.com/oauth/token';
const accessToken = 'b3f5cebfaddaab679eedc812ebed1696c194a996'; // Replace with your new access token
const apiEndpoint = 'https://www.strava.com/api/v3/athlete/activities';

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
    const stats = await getYearlyStats(accessToken);
    renderStats(stats);
  } catch (error) {
    console.error('Error initializing stats:', error);
  }
}

// Example usage:
// Call initializeStats directly with the access token
initializeStats();

// HTML to display the stats
// Include this in your HTML file:
/*
<div>
  <h2>Yearly Stats</h2>
  <p>Running: <span id="running-distance">Loading...</span></p>
  <p>Swimming: <span id="swimming-distance">Loading...</span></p>
  <p>Cycling: <span id="cycling-distance">Loading...</span></p>
</div>
*/