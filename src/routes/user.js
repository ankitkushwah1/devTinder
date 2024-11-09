const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/recevied", userAuth, async (req, res) => {
  // get all the pending connection request for the loggedIn user

  try {
    const loggedInUser = req.user;
    const requestIds = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // }).populate("fromUserId", ["firstName", "lastName"]);
    if (!requestIds) {
      return res.status(404).json({ message: "No request Found" });
    }
    res
      .status(200)
      .json({ message: "data fetch succesfully", data: requestIds });
    console.log(requestIds);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connection = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    if (!connection) {
      return res.status(404).send({ message: "No connection Found" });
    }
    const data = connection.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.status(200).json({ message: "Data Fetch Succesfully ", data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = userRouter;
