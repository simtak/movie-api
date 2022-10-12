const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(bodyParser.json());

let movies = [
  {
    Title: "Star Wars",
    Description: "Something with stars",
  },
];
let users = [];

//Create

app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need name");
  }
});

//Update

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400);
  }
});

//Create

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200);
  } else {
    res.status(400);
  }
});

//Delete

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res.status(200);
  } else {
    res.status(400);
  }
});

//Delete

app.delete("/users/:id/", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user = user.filter((user) => user.id != id);
    res.status(200);
  } else {
    res.status(400);
  }
});

//Read

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

//Read
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find(function (movie) {
    movie.Title === title;
  });
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("no such movie");
  }
});

//Read
app.get("/movies/genre/:genreName", (req, res) => {
  const genreName = req.params.genreName;
  const genre = movies.find(function (movie) {
    movie.Genre.Name === genreName;
  }).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("no such genre");
  }
});

//Read
app.get("/movies/directors/:directorName", (req, res) => {
  const directorName = req.params.directorName;
  const director = movies.find(function (movie) {
    movie.Director.Name === directorName;
  }).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("no such director");
  }
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
