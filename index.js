const express = require("express");
const app = express();
const morgan = require("morgan");

let topMovies = [
  {
    title: "Iron Man",
    phase: "Phase One: Avengers Assembled",
    category_name: "Action",
    release_year: 2015,
    running_time: 126,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray",
    number_discs: 1,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "May 2, 2008",
    budget: "140,000,000",
    gross: "318,298,180",
    time_stamp: "2015-05-03",
  },
  {
    title: "The Incredible Hulk",
    phase: "Phase One: Avengers Assembled",
    category_name: "Action",
    release_year: 2008,
    running_time: 112,
    rating_name: "PG-13",
    disc_format_name: "DVD",
    number_discs: 3,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "June 13, 2008",
    budget: "150,000,000",
    gross: "134,518,390",
    time_stamp: "2008-10-21",
  },
  {
    title: "Iron Man 2",
    phase: "Phase One: Avengers Assembled",
    category_name: "Action",
    release_year: 2015,
    running_time: 124,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray",
    number_discs: 1,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "May 7, 2010",
    budget: "200,000,000",
    gross: "312,057,433",
    time_stamp: "2015-05-03",
  },
  {
    title: "Thor",
    phase: "Phase One: Avengers Assembled",
    category_name: "Action",
    release_year: 2011,
    running_time: 115,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray + DVD",
    number_discs: 2,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "May 6, 2011",
    budget: "150,000,000",
    gross: "181,015,141",
    time_stamp: "2011-10-30",
  },
  {
    title: "Captain America",
    phase: "Phase One: Avengers Assembled",
    category_name: "Action",
    release_year: 2011,
    running_time: 124,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray + DVD",
    number_discs: 2,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "July 22, 2011",
    budget: "140,000,000",
    gross: "176,636,816",
    time_stamp: "2011-10-30",
  },
  {
    title: "Avengers, The",
    phase: "Phase One: Avengers Assembled",
    category_name: "Science Fiction",
    release_year: 2012,
    running_time: 143,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray + DVD",
    number_discs: 2,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "1.85:1",
    status: 1,
    release_date: "May 4, 2012",
    budget: "220,000,000",
    gross: "623,279,547",
    time_stamp: "2012-10-20",
  },
  {
    title: "Iron Man 3",
    phase: "Phase Two",
    category_name: "Action",
    release_year: 2015,
    running_time: 130,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray + DVD",
    number_discs: 2,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "May 3, 2013",
    budget: "200,000,000",
    gross: "408,992,272",
    time_stamp: "2015-05-03",
  },
  {
    title: "Thor: The Dark World",
    phase: "Phase Two",
    category_name: "Science Fiction",
    release_year: 2013,
    running_time: 112,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray",
    number_discs: 2,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "November 8, 2013",
    budget: "170,000,000",
    gross: "206,360,018",
    time_stamp: "2014-03-04",
  },
  {
    title: "Captain America: The Winter Soldier",
    phase: "Phase Two",
    edition: "Blu-ray Edition",
    release_year: 2014,
    running_time: 136,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray",
    number_discs: 1,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "April 4, 2014",
    budget: "170,000,000",
    gross: "259,746,958",
    time_stamp: "2014-09-19",
  },
  {
    title: "Guardians of the Galaxy",
    phase: "Phase Two",
    category_name: "Science Fiction",
    release_year: 2014,
    running_time: 121,
    rating_name: "PG-13",
    disc_format_name: "Blu-ray",
    number_discs: 1,
    viewing_format_name: "Widescreen",
    aspect_ratio_name: "2.35:1",
    status: 1,
    release_date: "August 1, 2014",
    budget: "170,000,000",
    gross: "333,130,696",
    time_stamp: "2014-12-07",
  },
];

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
