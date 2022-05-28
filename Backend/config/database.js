const mongoose = require("mongoose");
const dotenv = require("dotenv");

// env variables
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/coffee-db";

module.exports = () => {
  mongoose
    .connect(MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,})
    .then(() => {
      console.log("## => Connected to DB");
    })
    .catch((err) => console.log('Failed to connect to DB',err));
};
