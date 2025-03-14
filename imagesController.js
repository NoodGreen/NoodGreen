const Image = require('./imageModel');
const APIFeatures = require('./apiFetures');
const catchAsync = require('./catchAsync'); //updated with catchAsync with catchAsync.js
const ShopError = require('./shopError');

exports.aliasTopImages = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllImages = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Image.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  await features.paginate(); // Ensure paginate() completes before executing the query
  const images = await features.query;
  if (!images) {
    return res.status(404).json({
      status: 'fail',
      message: 'No images found',
    });
  }
  res.status(200).json({
    status: 'success',
    results: images.length,
    data: { images },
  });
});

exports.getImage = catchAsync(async (req, res, next) => {
  const image = await Image.findById(req.params.id);
  if (!image) {
    return res.status(404).json({
      status: 'fail',
      message: 'Image not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { image },
  });
});

//controller 3
exports.createImage = catchAsync(async (req, res, next) => {
  const newImage = await image.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      image: newImage,
    },
  });
});

//controller 4
exports.updateImage = catchAsync(async (req, res, next) => {
  const image = await image.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!image) {
    return res.status(404).json({
      status: 'fail',
      message: 'Image not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      image: image,
    },
  });
});

//controller 5
exports.deleteImage = catchAsync(async (req, res, next) => {
  await image.findByIdAndDelete(req.params.id);
  if (!image) {
    return res.status(404).json({
      status: 'fail',
      message: 'Image not found',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
