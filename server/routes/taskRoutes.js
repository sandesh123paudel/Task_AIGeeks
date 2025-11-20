const express = require("express");

const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:taskId", taskController.editTask);
router.delete("/:taskId", taskController.deleteTask);
router.patch("/:taskId/move", taskController.moveTask);

module.exports = router;
