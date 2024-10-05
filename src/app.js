const express = require("express");

const app = express();

// This will only match GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstname: "ankit", lastname: "kushwah" });
});

app.post("/user", (req, res) => {
  //Data save to DB
  res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
  // Delete a user
  res.send("Deleted succesfully!");
});

// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("Server is sucessfully listening on port 3000 ...");
});
