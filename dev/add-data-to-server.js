const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "./../config.env" });
const fs = require("fs");
const notices = require("./../models/noticeModel");
const db = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(db).then(() => {
  console.log("Connected to DB successfully");
});

const file = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

// Add all data to db
const sendData = async () => {
  try {
    await notices.create(file);
    console.log("Data added successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from db
const deleteAllData = async () => {
  try {
    await notices.deleteMany();
    console.log("Data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == "--send") {
  sendData();
} else if (process.argv[2] == "--delete") {
  deleteAllData();
}
