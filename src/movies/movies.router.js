// allowing all cross-origin requests since there is no "clear" specs

const router = require("express").Router({ mergeParams: true });
const theatersRouter = require("./../theaters/theaters.router");
const reviewsRouter = require("./../reviews/reviews.router");
const controller = require("./movies.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");
const cors = require("cors");

router.use("/:movieId/theaters", theatersRouter);
router.use("/:movieId/reviews", reviewsRouter);

router.route("/:movieId")
    .all(cors())
    .get(controller.read)
    .all(methodNotAllowed);

router.route("/")
    .all(cors())
    .get(controller.list)
    .all(methodNotAllowed);


module.exports = router;