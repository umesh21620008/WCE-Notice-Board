const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    // unique: [true, "Unique notice title required!!"],
  },
  description: {
    type: String,
    trim: true,
    // required: true,
  },
  subTitle: {
    type: String,
    trim: true,
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
    default: "BTech",
  },
  branch: {
    type: String,
  },
  author: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
  notice_id: {
    type: String,
    // required: true,
    // unique: true,
  },
  download: {
    type: String,
    trim: true,
  },
});

const notices = mongoose.model("notices", noticeSchema);

module.exports = notices;
