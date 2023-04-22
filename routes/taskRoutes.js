const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const taskController = require("../controllers/taskController");

router.get("/", auth, taskController.getTasks);
router.get("/create", auth, taskController.getCreateTask);
router.post("/create", auth, taskController.postCreateTask);
router.get("/:id", auth, taskController.getTaskById);
router.get("/:id/edit", auth, taskController.getEditTask);
router.put("/:id/edit", auth, taskController.putEditTask);
router.delete("/:id/delete", auth, taskController.deleteTask);

module.exports = router;
