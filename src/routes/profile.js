const express = require("express");
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  validateProfileEditData,
  validateForgetPassword,
} = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} your Profile updated succesfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/forgetPassword", userAuth, async (req, res) => {
  try {
    validateForgetPassword(req);
    const loggedInUser = req.user;
    const isPasswordValid = await loggedInUser.validatePassword(
      req.body.oldPassword
    );
    if (!isPasswordValid) {
      throw new Error("Please enter Correct old password");
    }
    const passwordHash = await bcrypt.hash(req.body.newPassword, 10);
    loggedInUser.password = passwordHash;
    loggedInUser.save();
    res.send(`Password change Successfully`);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
