const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes 
app.use(routes)

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
