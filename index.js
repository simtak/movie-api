const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/MyFlix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

//Read

app.get("/movies", (req, res) => {
  res.send("Successful GET request returning all movies");
});

//Read
app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request returning data only !! on requested movie");
});

//Read
app.get("/movies/genre/:genreName", (req, res) => {
  res.send("Successful GET request about genre infos ");
});

//Read
app.get("/movies/directors/:directorName", (req, res) => {
  res.send("Successful GET request about director infos ");
});

//Create

app.post("/users", (req, res) => {
  res.send("Successful POST request for new user ");
});

//Update

app.put("/users/:id", (req, res) => {
  res.send("Successful PUT request to update username ");
});

//Create

app.post("/users/:id/:movieTitle", (req, res) => {
  res.send("Successful POST request about new favorite movie by user ");
});

//Delete

app.delete("/users/:id/:movieTitle", (req, res) => {
  res.send(
    "Successful DELETE request, deleting favorite movie from specified user "
  );
});

//Delete

app.delete("/users/:id/", (req, res) => {
  res.send("Successful DELETE deleting user ");
});

//
//
//
//

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

// // middleware/////////////////////
// app.use(morgan("common"));
// app.use(express.static("public"));

// // GET request

// // *Test Error code*
// // app.get("*", function routeHandler() {
// //     throw new Error("Oops!");
// //   });

// app.get("/movies", (req, res) => {
//   res.json(topMovies);
// });

// app.get("/", (res, req) => {
//   req.send("Welcome to my Movie API");
// });

// //error handling
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).send("Something broke!");
// });
