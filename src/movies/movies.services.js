const knex = require("../db/connection");

function listMovies() {
    return knex("movies").select("*");
}

function listActiveMovies() {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*", "mt.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.movie_id");
}

function readMovie(movieId) {
    return (
        knex("movies").select("*").where({movie_id: movieId})
    )
}

module.exports = {
    listMovies,
    listActiveMovies,
    readMovie,
}