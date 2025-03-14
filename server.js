const mongoose = require('mongoose');
const dotenv = require('dotenv');
const shop = require('./shop');

dotenv.config({ path: './config.env' });
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

shop.listen(3000, 'localhost', () => {
  // localhost shop is only open on your own computer, not the internet,
  // () callback funtion is like an alarm that rings when the shop opens.
  console.log('🔔 Shop is open at http://localhost:3000');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  ServiceWorkerRegistration.close(() => {
    process.exit(1);
  });
});
