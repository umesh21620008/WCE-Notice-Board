const notices = require("./../models/noticeModel");
const APIFeatures = require("./../utils/APIFeatures");
const dotenv = require("dotenv");

exports.createNotice = (req, res) => {
  res.render("Notice.ejs");
};

exports.getAllNotices = async (req, res) => {
  try {
    const query = notices.find();
    let finalQuery = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .paginate()
      .filterFields();

    let notice;
    if (req.admin == true) {
      notice = await finalQuery.query.find().where("email").equals(req.email);
    } else {
      notice = await finalQuery.query;
    }

    if (req.admin != true)
      res.status(200).render("index.ejs", { notice: notice });
    else return notice;

  
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneNotice = async (req, res) => {
  try {
    const query = await notices.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        notice: query,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.postNotice = async (req, res) => {
  try {
    let fileLink = process.env.NOTICEDELLINKFRONT + "/admin-dashboard"

      if (req.file) {
      fileLink =
        process.env.NOTICEDELLINKFRONT + 
        "//noticeFiles//" +
        req.file.filename;
    }

    req.body.email = req.email;
    req.body.author = req.authorName;

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let seconds = Math.round(date.getSeconds() * Math.random() * 10);
    req.body.notice_id = req.email.slice(0, 2) + day + month + year + seconds;
    req.body.download = fileLink;


    const noticeDeleteLink =
      process.env.NOTICEDELLINKFRONT +
      "/admin-dashboard/" +
      req.body.notice_id;

    req.body.noticeDeleteLink = noticeDeleteLink;

    if (!req.body.startDate) delete req.body.startDate;

    const query = await notices.create(req.body);

    res.status(201).redirect("/admin-dashboard");
  } catch (err) {
    res.status(400).render("Notice.ejs");
  }
};

exports.patchNotice = async (req, res) => {
  try {
    const query = await notices.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        notices: query,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteNotice = async (req, res, next) => {
  try {
    const notice = await notices.findOneAndDelete(req.body);
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.send404 = (req, res) => {
  res.status(404).render("error.ejs");
};
