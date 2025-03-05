//project details
//express (for making websites shop)

//modules
const express = require("express"); //handle requests and responses, eg: listen to shop. -2
const fs = require("fs"); //file system will handle, system files. -4
const morgan = require("morgan");
//own module importing router and use
const imagesRouter = require("./imagesRouter");

//store
const shop = express(); //create app or web. eg: shop -1

shop.use(express.json()); //shop.use() runs code before requests reach route handlers,  -6
//express.json() Required for handling JSON request bodies accessing from frontend.

shop.use("/images", imagesRouter);

//server -3
shop.listen(3000, "localhost", () => {
  //3000 shop address.
  // localhost shop is only open on your own computer, not the internet,
  // () callback funtion is like an alarm that rings when the shop opens.
  console.log("🔔 Shop is open at http://localhost:3000");
});

//more
//////////////
// JSON is a way to store and send data.
// {} Objects eg: box that holds key-value pairs.
// [] Arrays eg: list of values.
//////////////
