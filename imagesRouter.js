const express = require("express");
const router = express.Router();
const imageController = require("./imagesController");

router.param("id", imageController.checkID);

router.route("/").get(imageController.getAllImages);
router.route("/:id").get(imageController.getImage);
module.exports = router;
