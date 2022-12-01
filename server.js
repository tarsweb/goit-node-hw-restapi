const mongoose = require('mongoose');
const app = require('./app')

require('dotenv').config()

const {PORT = 3000, DB_HOST} = process.env;

mongoose.Promise = global.Promise;

console.log("PORT: ",PORT, "\nDB_HOST :", DB_HOST);

mongoose.connect(DB_HOST, { autoIndex: true,})
  .then(()=> {
    console.log("Database connection successful");
    app.listen(PORT, () => {
          console.log("Server running. Use our API on port:", PORT);
        })})
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })