const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Image = require('./imageModel');

dotenv.config({ path: './config.env' });

//connecting to db
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB)
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful!');
  })
  .catch((err) => console.log('DB connection error:', err));

// READ JSON FILE
const images = JSON.parse(fs.readFileSync(`${__dirname}/items.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Image.create(images);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Image.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
