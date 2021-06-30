const knex = require("../db/connection");

function readReview(id, originalUrl) {
    let requestType
    (originalUrl.includes("movie")) ? requestType = "movie" : requestType = "review";
    // using originalUrl for /movies/:movieId/reviews route as it adds some
    // flexibility for future improvements
    if (requestType === "movie") {
        return (
            knex("reviews as r")
            .select("*")
            .where({ movie_id: id })
        )
    }
    // handles reviews route
    return (
        knex("reviews")
        .select("*")
        .where({ review_id: id })
        .first()
    )
}

function readCritic(reviewId){
    return (
        knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("c.*")
        .where({ "r.review_id": reviewId})
    )
}

function updateReview(updatedReview) {
    return (
        knex("reviews")
        .where({ review_id: updatedReview.review_id})
        .update(updatedReview)
    )
}

function deleteReview(reviewId) {
    return (
        knex("reviews").select("*")
        .where({ review_id: reviewId })
        .del()
    )
}

module.exports = {
    readReview,
    readCritic,
    updateReview,
    deleteReview,
}