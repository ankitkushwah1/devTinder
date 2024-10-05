const express = require("express");

const app = express();

// This will only match GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstname: "ankit", lastname: "kushwah" });
});

app.listen(3000, () => {
  console.log("Server is sucessfully listening on port 3000 ...");
});
