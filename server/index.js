const axios = require("axios");
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

<<<<<<< HEAD
app.post("/api/trigger-webhook", (req, res) => {
  const https = require("https");

  const data = JSON.stringify({ test: "event" });

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

app.get("/api/refresh", (req, res) => {
  // Make GET request to the external API
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://api.ipstack.com/check?access_key=acb97247d9841409f7ccaf53b6749b1a",
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      let data = response.data;
      const extractedData = {
        // Extract the relevant fields from the response
        field1: data.field1,
        field2: data.field2,
        // Add any other fields you need to extract
      };

      // Use the extracted data as needed (e.g., save to database, send to frontend)
      // ...

      res.status(200).json({ message: "Refresh triggered successfully." });
    })
    .catch((error) => {
      console.error(error);
      // Send an error response to the frontend, if needed
      res
        .status(500)
        .json({ error: "An error occurred during the refresh request." });
    });
});
/*
=======

>>>>>>> 392fd9b953150a5ed097e577fbde5aa156662b9f
 app.get('/api/search', (req, res) => {
  const { search, lat, long } = req.query;

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${search}&location=${lat},${long}&radius=5000&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`,
    headers: {
      'Accept': 'application/json'
    }
  };

  axios.request(config)
    .then((response) => {
      // Send the response data back to the frontend
      const { results } = response.data;
      // Check if results array exists and has items
      if (!results || results.length === 0) {
        // Handle no results available
        res.send({});
      } else {
        // Access the first result item
        let storesData = []

        results.forEach(result =>{
        // Destructure the properties from the first result item
        const { name, photos, opening_hours, rating, plus_code, id } = result;
      
        // Update the storeData object with the extracted data
        let storeData = {
          name: name || "", // The name of the store
          place_id: id || "",
          photos: photos || [], // An array of photos for the store
          opening_hours: {
            open_now: opening_hours && opening_hours.open_now || false, // Whether the store is currently open (true or false)
          },
          rating: rating || 0, // The rating of the store (a numeric value)
          plus_code: {
            compound_code: plus_code && plus_code.compound_code || "", // The city name or compound code
          },
        };

        storesData.push(storeData);
      })
        // Send the storeData object as response
        res.send(storesData);}
    
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
      // Send an error response to the frontend
      res.status(500).json({ error: 'An error occurred during the request.' });
    });
<<<<<<< HEAD
});*/
=======
});

>>>>>>> 392fd9b953150a5ed097e577fbde5aa156662b9f
