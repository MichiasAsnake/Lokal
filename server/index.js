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

app.get("/api/search", (req, res) => {
  const { search, lat, long } = req.query;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${search}&location=${lat},${long}&radius=5000&key=AIzaSyDR_uL1-Fbf5vgatyRpAZWdu2TlOzr_XDQ`,
    headers: {
      Accept: "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      // Send the response data back to the frontend
      const { results } = response.data;
      // Check if results array exists and has items
      if (!results || results.length === 0) {
        // Handle no results available
        res.send({});
      } else {
        // Access the first result item
        let storesData = [];

        results.forEach((result) => {
          // Destructure the properties from the first result item
          const { name, photos, opening_hours, rating, plus_code, id } = result;

          // Update the storeData object with the extracted data
          let storeData = {
            name: name || "", // The name of the store
            place_id: id || "",
            photos: photos || [], // An array of photos for the store
            opening_hours: {
              open_now: (opening_hours && opening_hours.open_now) || false, // Whether the store is currently open (true or false)
            },
            rating: rating || 0, // The rating of the store (a numeric value)
            plus_code: {
              compound_code: (plus_code && plus_code.compound_code) || "", // The city name or compound code
            },
          };

          storesData.push(storeData);
        });
        // Send the storeData object as response
        res.send(storesData);
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error(error);
      // Send an error response to the frontend
      res.status(500).json({ error: "An error occurred during the request." });
    });
});
