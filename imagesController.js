const express = require("express");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./items.json", "utf-8"));
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

exports.getAllImages = (req, res) => {
  res.status(200).json({
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
