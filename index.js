const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./dataBase/database.service");
const TodoRouter = require("./routes/Todo.route");

const app = express();
dbConnect();
app.use(bodyParser.json());
app.use("/todos", TodoRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
