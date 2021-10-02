const autoBind = require("auto-bind");
const taskModel = require("../models/task")
module.exports = new class taskController {
    constructor(){
        autoBind(this)
    }
    async insert(req, res, next) {
        try {
            const { title } = req.body;
            const task = await taskModel.create({ title }).catch(error => {
                throw { status: 500, error: "InternalServerError" }
            })
            return res.status(201).json({
                message: "insert Done!",
                task
            })
        } catch (error) {
            next(error)
        }
    }
    async findAll(req, res, next) {
        try {
            const tasks = await taskModel.find({})
            return res.status(200).json({
                tasks
            })
        } catch (error) {
            next(error)
        }
    }
    async findById(id) {
        const task = await taskModel.findById(id).catch(error => {
            throw { status: 400, error: "BadRequest" }
        })
        if (!task) throw { status: 404, error: "not Found Task" }
        return task
    }
    async findOne(req, res, next) {
        try {
            const { id } = req.params;
            const task = await this.findById(id)
            return res.status(200).json({ task })
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const task = await this.findById(id)
            const result = taskModel.deleteOne({ _id: id }).catch(error => {
                throw { status: 500, error: "can not remove task" }
            })
            return res.status(202).json({
                message: "remove task be successfuly"
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const {title} = req.body;
            if(!title) throw {status : 400, message : "title cannot to be empty"};
            const task = await this.findById(id)
            const result = await taskModel.updateOne({ _id: id }, {title}).catch(error => {
                throw { status: 500, error: "can not remove task" }
            })
            return res.status(202).json({
                message: "update task done"
            })
        } catch (error) {
            next(error)
        }
    }
}