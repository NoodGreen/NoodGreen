const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// Define the schema
const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An image must have a name'],
      unique: true,
      trim: true,
    },
    summary: {
      // Changed from "details" to "summary"
      type: String,
      required: [true, 'An image must have a summary'],
    },
    ratingsAverage: {
      // Changed from "rating"
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },
    price: {
      type: Number,
      required: [true, 'An image must have a price'],
      min: [0, 'Price must be a positive number'],
    },
    difficulty: {
      // Added this field
      type: String,
      required: [true, 'An image must have a difficulty level'],
      enum: ['easy', 'medium', 'hard'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE: Runs before .save() and .create()
imageSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE: Runs before find queries
imageSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

// QUERY MIDDLEWARE: Runs after find queries
imageSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// Prevent model overwriting
const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

// Export the model
module.exports = Image;
