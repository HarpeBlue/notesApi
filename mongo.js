const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.MONGO_DB_URI;

// conextion string

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error(err);
  });
