const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
    enum: ["todo", "inprogress", "done"],
  },
});

module.exports = mongoose.model("Task", taskSchema);
