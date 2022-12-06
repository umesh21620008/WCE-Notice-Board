const express = require("express");
const router = require("./routes/noticeRoutes");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(express.json());
// app.use(express.static());

app.use(express.static("./public"));

app.use(express.urlencoded({ extended: true }));

// Set EJS as templating engine
app.set("view engine", "ejs");



app.use("/", router);


module.exports = app;
