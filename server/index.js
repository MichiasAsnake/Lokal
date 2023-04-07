// Import dependencies
const express = require('express');
const app = express();

// Define API endpoints
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start server
const PORT = 5000; // Replace with your desired port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Define an API endpoint for retrieving Google Places API results
app.get('/api/places', (req, res) => {
    // Make a request to Google Places API and process the response
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params = new URLSearchParams({
      location: '37.7749,-122.4194',  // Example location (latitude,longitude)
      radius: 5000,  // Example radius in meters
      keyword: 'oil change',  // Example service type
      key: 'AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ'  // Replace with your actual API key
    });
  
    // Make a GET request to the Google Places API
    fetch(`${url}?${params}`)
      .then(response => response.json())
      .then(data => {
        // Extract the relevant data from the response
        const results = data.results;
        // ... code to extract relevant data ...
  
        // Return the results data as a JSON response
        res.json({ results });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch results from Google Places API' });
      });
  });

