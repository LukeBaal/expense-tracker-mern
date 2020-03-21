const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
// const connectDB = require('./config/db');
// const connectPouchDB = require('./config/pouchdb');

dotenv.config({ path: './config/config.env' });

// connectDB();
exports.db = new PouchDB(process.env.POUCH_URI, {
  skip_setup: true
}); //connectPouchDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

// app.listen(PORT, async () => {
//   try {
//     const info = await db.info();
//     console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
//         .bold
//     );
//     console.log(info);
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// });
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
