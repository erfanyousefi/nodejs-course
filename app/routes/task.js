const { Router } = require("express");
const taskController = require("./../controllers/task")
const router = Router()
router.get("/", taskController.findAll);
router.get("/:id", taskController.findOne);
router.delete("/:id", taskController.delete);
router.post("/", taskController.insert)
router.put("/:id", taskController.update)

module.exports = router;