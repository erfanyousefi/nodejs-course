const { Schema, model } = require("mongoose")
const taskSchema = new Schema({
    title: { type: String, required: true, default: "test" }
}, {
    timestamps: true
})
const taskModel = model("task", taskSchema)
module.exports = taskModel;