const mongoose = require("mongoose");
const dbURL = "mongodb://127.0.0.1:27017/todolist";

const dbConnect = () => {
  mongoose.connect(dbURL);
  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

module.exports = dbConnect;
