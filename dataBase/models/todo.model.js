const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  completed: {
    required: true,
    type: Boolean,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
