const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    const columns = [
      {
        id: "todo",
        name: "To Do",
        tasks: tasks.filter((t) => t.columnId === "todo"),
      },
      {
        id: "inprogress",
        name: "In Progress",
        tasks: tasks.filter((t) => t.columnId === "inprogress"),
      },
      {
        id: "done",
        name: "Done",
        tasks: tasks.filter((t) => t.columnId === "done"),
      },
    ];

    return res.status(200).json(columns);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { id, content, columnId } = req.body;

    if (!content || !columnId) {
      return res
        .status(400)
        .json({ message: "Content and ColumnId are required" });
    }

    const newTask = new Task({
      id: id || Date.now().toString(),
      content,
      columnId,
    });
    await newTask.save();
    return res
      .status(201)
      .json({ message: "New Task Created Successfully", newTask });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

exports.editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { content, columnId } = req.body;

    const task = await Task.findOneAndUpdate(
      { id: taskId },
      { content, columnId },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    return res.status(200).json({ message: "Task Updated Successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { columnId } = req.body;

    const task = await Task.findOneAndDelete({ id: taskId, columnId });
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    return res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { columnId } = req.body;

    const task = await Task.findOneAndUpdate(
      { id: taskId },
      { columnId },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }
    return res.status(200).json({ message: "Task Moved Successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
