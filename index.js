const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

// middleware
app.use(morgan("common"));
app.use(express.static("public"));

// GET request

// *Test Error code*
// app.get("*", function routeHandler() {
//     throw new Error("Oops!");
//   });

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (res, req) => {
  req.send("Welcome to my Movie API");
});

//error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
