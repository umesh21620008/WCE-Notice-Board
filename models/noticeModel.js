const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Title",
    // unique: [true, "Unique notice title required!!"],
  },
  description: {
    type: String,
    trim: true,
    default: "Description",

    // required: true,
  },
  subTitle: {
    type: String,
    trim: true,
    default: "SubTitle",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  program: {
    type: String,
    default: "Everyone",
  },
  branch: {
    type: String,
    default: "Everyone",
  },
  author: {
    type: String,
    default: "ME",
  },
  year: {
    type: String,
    required: true,
    default: "Everyone",
  },
  notice_id: {
    type: String,
    // required: true,
    // unique: true,
  },
  download: {
    type: String,
    trim: true,
    default: "/",
  },
});

const notices = mongoose.model("notices", noticeSchema);

module.exports = notices;
