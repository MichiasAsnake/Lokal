// Import dependencies

const axios = require('axios');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Start server
const PORT = 5000; // Replace with your desired port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/api/search', (req, res) => {
  const { search, loc } = req.query;

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${search}&location=${loc}&radius=5000&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`,
    headers: {
      'Accept': 'application/json'
    }
  };

  axios.request(config)
    .then((response) => {
      // Send the response data back to the frontend
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
      // Send an error response to the frontend
      res.status(500).json({ error: 'An error occurred during the request.' });
    });
});