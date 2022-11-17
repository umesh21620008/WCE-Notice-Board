const notices = require("./../models/noticeModel");
const APIFeatures = require("./../utils/APIFeatures");

exports.getAllNotices = async (req, res) => {
  try {
    const query = notices.find();
    let finalQuery = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .paginate()
      .filterFields();

    const notice = await finalQuery.query;

    res.status(200).render("index.ejs", {"notice":notice});
    
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     notices: notice,
    //   },
    // });


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
    console.log(req.body);
    req.body.notice_id = "NNDEPT01012022";
    req.body.download = "https://www.africau.edu/images/default/sample.pdf";
    const query = await notices.create(req.body);
    // res.status(201).json({
    //   status: "success",
    //   data: {
    //     notice: query,
    //   },
    // });
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
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

exports.deleteNotice = async (req, res) => {
  try {
    const notice = await notices.findByIdAndDelete(req.body.id);
    res.status(204).json({
      status: "success",
      data: {
        notice,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
