const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: Number,
  description: String,
  genre: {
    name: String,
    description: String,
  },
  director: String,

  imagePath: String,
  featured: Boolean,
});

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
