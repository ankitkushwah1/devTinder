const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ankitkushwah9813:iTuHIwvpxtKY3uai@namastenode.mcpb4.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
