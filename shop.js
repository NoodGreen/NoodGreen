const express = require('express'); //handle requests and responses, eg: listen to shop. -2
const morgan = require('morgan');

const shop = express(); //create app or web. eg: shop -1

const imagesRouter = require('./imagesRouter');
const AppError = require('./shopError');
const globalErrorHandler = require('./errorController');

require('dotenv').config(); // Load environment variables
console.log(process.env.NODE_ENV); // Check if it's now defined
if (process.env.NODE_ENV === 'development') {
  shop.use(morgan('dev'));
}

shop.use(express.json()); //shop.use() runs code before requests reach route handlers,
//express.json() Required for handling JSON request bodies accessing from frontend.
shop.use('/images', imagesRouter);

//if the url not found this message will show, instead of html error.
shop.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

shop.use(globalErrorHandler);

module.exports = shop;
