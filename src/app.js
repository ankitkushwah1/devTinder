const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");

const app = express();

// Handle Auth Middleware for all request GET, POST, PATCH , DELETE
app.use("/admin", adminAuth);
app.post("/user/login", (req, res) => {
  res.send("User logged in successfully ");
});
app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});
app.get("/admin/getAllData", (req, res) => {
  // Login of checking if the request is authorized
  res.send("all data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  // Login of checking if the request is authorized
  res.send("Deleted Data User");
});

app.listen(3000, () => {
  console.log("Server is sucessfully listening on port 3000 ...");
});
