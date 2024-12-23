async function fetchStravaStats() {
  try {
    const response = await fetch('/.netlify/functions/strava-stats');
    const stats = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch stats:', stats);
      throw new Error('Failed to fetch stats');
    }

    // Update the HTML with the stats
    document.getElementById('running-distance').textContent = `${(stats.running / 1000).toFixed(2)} km`;
    document.getElementById('swimming-distance').textContent = `${(stats.swimming / 1000).toFixed(2)} km`;
    document.getElementById('cycling-distance').textContent = `${(stats.cycling / 1000).toFixed(2)} km`;
  } catch (error) {
    console.error('Error fetching Strava stats:', error);
  }
}

// Fetch and display stats on page load
fetchStravaStats();