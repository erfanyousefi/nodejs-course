const { Router } = require("express");
const taskRouter = require("./task")
const authRouter = require("./auth")
const router = Router()
router.use("/task", taskRouter)
router.use("/auth", authRouter)

module.exports = router;