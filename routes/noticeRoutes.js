const express = require("express");
let { router } = require("./../app");
const app = require("./../app");
const noticeController = require("./../controllers/noticeController");
const userController = require("./../controllers/userController");
router = express.Router();

router
  .route("/signin")
  .get(userController.getSignin)
  .post(userController.postSignin);

router
  .route("/signup")
  .get(userController.getSignup)
  .post(userController.postSignup);

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
