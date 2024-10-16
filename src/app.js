const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());
app.post("/singup", async (req, res) => {
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

// Login API
app.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "1d",
      });
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

//  Get User Profile
app.get("/profile", userAuth, async (req, res) => {
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
// Get User by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    res.send(users);
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong !!");
  }
});

// Feed API -GET/ Feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("Users not found");
    }
  } catch (err) {
    res.status(404).send("Feeds Not fetched Succesfully");
  }
});

// Delete API
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Succesfully");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

// UPDATE A USER
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more then 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated sucessfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
  }
});

// SEND CNNECTION REQUIEST
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log("Sending a connection request");
  res.send(user.firstName + " send the connection request");
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is sucessfully listening on port 3000 ...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
