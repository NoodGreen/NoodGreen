//methode.3 //export module router to shop.js
const express = require('express');
const router = express.Router(); //Import router
const imageController = require('./imagesController');

router
  .route('/')
  .get(imageController.getAllImages)
  .post(imageController.getAllImages);

router.route('/:id').get(imageController.getImage);

module.exports = router;
