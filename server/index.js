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

app.post("/api/trigger-webhook", (req, res) => {

  const https = require("https")
  
  const data = JSON.stringify({ "test": "event" });

  const options = {
    hostname: "eokyvpokxzyzxr6.m.pipedream.net",
    port: 443,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const webhookReq = https.request(options, (webhookRes) => {
    // Handle response from webhook or server-side action
    // ...
  });

  webhookReq.write(data);
  webhookReq.end();
});

app.get('/api/refresh', (req, res) => {
  // Make GET request to the external API
  let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://api.ipstack.com/check?access_key=acb97247d9841409f7ccaf53b6749b1a',
  headers: { }
};

axios.request(config)
.then((response) => {
  let data = response.data
      const extractedData = {
        // Extract the relevant fields from the response
        field1: data.field1,
        field2: data.field2,
        // Add any other fields you need to extract
      };

      // Use the extracted data as needed (e.g., save to database, send to frontend)
      // ...

   
      res.status(200).json({ message: 'Refresh triggered successfully.' });
    })
    .catch((error) => {
      console.error(error);
      // Send an error response to the frontend, if needed
      res.status(500).json({ error: 'An error occurred during the refresh request.' });
    });
});
/*
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
});*/

