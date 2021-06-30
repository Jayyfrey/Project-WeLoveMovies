// allowing all cross-origin requests since there is no "clear" specs

const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("./../errors/methodNotAllowed");
const cors = require("cors");

router.route("/")
    .all(cors())
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:reviewId")
    .all(cors())
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;