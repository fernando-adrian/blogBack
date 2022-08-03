const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const user = "fernando";
const pass = "GMoOdXYf4MLeIfTE";

const postsRoutes = require("./routes/posts");
mongoose
  .connect(
    "mongodb+srv://" +
      user +
      ":" +
      pass +
      "@blog-cluster.yk7e9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((connection) => {
    console.log("Connected to the DB!!");
  })
  .catch((err) => {
    console.log("Connection failed!!", err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/img", express.static(path.join(__dirname + "/img")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", postsRoutes);

module.exports = app;
