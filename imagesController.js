const express = require("express"); //handle requests and responses, eg: listen to shop.
const fs = require("fs"); //file system will handle, system files.

//read
const data = JSON.parse(fs.readFileSync("./items.json", "utf-8")); //JSON.parse Converts the JSON text into a JavaScript object.
const images = data.images || [];

exports.checkID = (req, res, next, val) => {
  console.log(`image id is : ${val} `);
  if (req.params.id * 1 > images.length) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete tour" });
  }
  next();
};

//contollers
exports.getAllImages = (req, res) => {
  //this funtion with two arguments req, res.
  res.status(200).json({
    //res.status(200) which mean everything is okay, and send data formate in JSON.
    status: "sucess",
    data: {
      images,
    },
  });
};

exports.getImage = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const image = images.find((el) => el.id == id);
  res.status(200).json({
    status: "success",
    data: {
      image,
    },
  });
};
