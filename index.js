const express = require("express");
const cors = require("cors");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("hello Rocket");
});

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  const sightingsList = sightings.map((sighting) => sighting.REPORT_NUMBER);

  sightingsList.sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  res.json(sightingsList);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightingIndex = req.params.sightingIndex;
  const sightings = await getSightings();

  // Ensure sightingIndex within range
  if (sightingIndex >= 0 && sightingIndex < sightings.length) {
    const requestedSighting = sightings[sightingIndex];
    res.json(requestedSighting);
  } else {
    res.status(404).json({ error: "Sighting not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
