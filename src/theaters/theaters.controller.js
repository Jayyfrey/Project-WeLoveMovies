const db = require("../db/connection");
const theatersServices = require("./theaters.services");

// function names include the name of the resource
// all functions sorted in the same order as they appear in the exports

async function listTheaters(request, response, next) {
    const { movieId } = request.params;
    // handles /movies/:movieId/:reviews route
    if (movieId) {
        const theaters = await theatersServices.listTheatersByMovieID(movieId);
        response.json({ data: theaters})
    }
    // handles the rest of get requests
    const theaters = await theatersServices.listTheaters();
    for (let i = 0; i < theaters.length; i++) {
        const movies = await theatersServices.listMoviesByTheaters(theaters[i].theater_id);
        theaters[i]["movies"] = movies
    }
    response.json({ data: theaters })
}

module.exports = {
    list: [listTheaters],
}
