const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/singup", async (req, res) => {
  // Creating a new instance of the User Modal
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Succesfully");
  } catch (err) {
    res.status.apply(400).send("Error saving the user:" + err.message);
  }
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
