const express = require("express");
const app = express();
const port = 3000;

const locations = ["New York", "London", "Tokyo", "Paris", "Sydney"];

app.get("/:company", (req, res) => {
  const { company } = req.params;
  const logistic = {
    company: company,
    time: Math.floor(new Date().getTime() / 1000),
    location: [locations[Math.floor(Math.random() * locations.length)]],
  };
  res.json(logistic);
});

app.listen(port, () => {
  console.log(`Logistic service listening on port ${port}`);
});
