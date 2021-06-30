const knex = require("../db/connection");

function listTheaters() {
    // couldn't figure out the query that will add movies as key:value pair
    return (
        knex("theaters")
        .select("*")
    )
}

function listMoviesByTheaters(theaterId) {
    return (
        knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("m.*")
        .where({ "mt.theater_id": theaterId })
        .groupBy("m.movie_id")
    )
}

function listTheatersByMovieID(movieId) {
    return (
        knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("m.*")
        .where({ "mt.movie_id": movieId })
        .groupBy("m.theater_id")
    )
}


module.exports = {
    listTheaters,
    listMoviesByTheaters,
    listTheatersByMovieID,
}