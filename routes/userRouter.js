const express = require("express");
const userRouter = express.Router();
const userController = require("./../controller/user");
userRouter.route("/").get(userController.getAll).post(userController.create);

userRouter
  .route("/:id")
  .get(userController.get)
  .put(userController.update)
  .delete(userController.remove);

module.exports = userRouter;

