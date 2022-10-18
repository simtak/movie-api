const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlix", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

//Read

app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Read
app.get("/movies/:name", (req, res) => {
  Movies.findOne({ name: req.params.name })
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Read
app.get("/movies/genre/:name", (req, res) => {
  Movies.findOne({ "genre.name": req.params.name })
    .then((movie) => {
      res.send(movie.genre.description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Read
app.get("/movies/directors/:directorname", (req, res) => {
  Movies.findOne({ director: req.params.directorname })
    .then((movie) => {
      res.json(movie.director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Create new user

app.post("/users", (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + " already exists");
      } else {
        Users.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: req.body.birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Update user details

app.put("/users/:id", (req, res) => {
  Users.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Create

// app.post("/users/:id/movies/:movieID", (req, res) => {
//   Users.findOneAndUpdate(
//     { _id: req.params.id },

//     {
//       $push: {
//         favoriteMovies: req.params.movieID,
//       },
//     },
//     { new: true },
//     (err, updatedUser) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       } else {
//         res.json(updatedUser);
//       }
//     }
//   );
// });

//Add a movie to a user's list of favorites
app.post("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.Username },
    {
      $push: { favoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Delete favorite movie
app.delete("/users/:Username/movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.Username },
    {
      $pull: { favoriteMovies: req.params.MovieID },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Delete user

app.delete("/users/:username", (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
