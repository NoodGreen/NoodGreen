//methode.3 //export module router to shop.js
const express = require("express");
const router = express.Router(); //Import router
const imageController = require("./imagesController");

router.param("id", imageController.checkID);

router.route("/").get(imageController.getAllImages); //Attach router to `/` path
router.route("/:id").get(imageController.getImage);
module.exports = router;
