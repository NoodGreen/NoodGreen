const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const imagesRouter = require("./imagesRouter");

const shop = express();
shop.use(express.json());
shop.use("/images", imagesRouter);

shop.listen(3000, "localhost", () => {
  console.log("🔔 Shop is open at http://localhost:3000");
});
