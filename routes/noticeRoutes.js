const express = require("express");
const app = require("./../app");
const noticeController = require("./../controllers/noticeController");
router = express.Router();

router
  .route("/")
  .get(noticeController.getAllNotices)
  .post(noticeController.postNotice);

router
  .route("/:id")
  .get(noticeController.getOneNotice)
  .patch(noticeController.patchNotice)
  .delete(noticeController.deleteNotice);

module.exports = router;
