const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    //Route Handler
    console.log("Handling the route user!!");
    // res.send();
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2!");
    // res.send("2nd response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 3!");
    // res.send("3nd response!!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 4!");
    // res.send("4nd response!!");
    next();
  },
  (req, res) => {
    console.log("Handling the route user 5!");
    res.send("5nd response!!");
  }
);

app.listen(3000, () => {
  console.log("Server is sucessfully listening on port 3000 ...");
});
