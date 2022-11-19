const express = require("express");
const app = require("./../app");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `public/noticeFiles`);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
const noticeController = require("./../controllers/noticeController");
router = express.Router();

router
  .route("/")
  .get(noticeController.getAllNotices)
  .post(upload.single("uploadFile"), noticeController.postNotice);

router
  .route("/:id")
  .get(noticeController.getOneNotice)
  .patch(noticeController.patchNotice)
  .delete(noticeController.deleteNotice);

module.exports = router;
