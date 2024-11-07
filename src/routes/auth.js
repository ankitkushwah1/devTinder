const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");
const authRouter = express.Router();
authRouter.post("/singup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { password, firstName, lastName, emailId } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // Creating a new instance of the User Modal
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Succesfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      console.log(token);
      // Add the token to cookie and send the response back to the server
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Succesfull!!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Sucessfully!");
});

module.exports = authRouter;
