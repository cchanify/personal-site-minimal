async function fetchStravaStats() {
  try {
    const response = await fetch('/.netlify/functions/strava-stats');
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      console.error("API error:", await response.text());
      throw new Error('Failed to fetch stats');
    }

    if (contentType && contentType.includes('application/json')) {
      const stats = await response.json();
      document.getElementById('running-distance').textContent = `${(stats.running / 1000).toFixed(2)} km`;
      document.getElementById('swimming-distance').textContent = `${(stats.swimming / 1000).toFixed(2)} km`;
      document.getElementById('cycling-distance').textContent = `${(stats.cycling / 1000).toFixed(2)} km`;
    } else {
      console.error("Unexpected response type:", await response.text());
      throw new Error('Unexpected response type');
    }
  } catch (error) {
    console.error("Error fetching Strava stats:", error);
  }
}

fetchStravaStats();
