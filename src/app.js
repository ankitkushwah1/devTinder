const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("Random Error");
    res.send("User Data sent");
  } catch (err) {}
  // Logic of DB call and get user data
  res.status(500).send("Some Error contact support team");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your Error
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is sucessfully listening on port 3000 ...");
});
