const express = require("express");
const app = express();
const mongoose = require("mongoose")
const http = require("http")
const PORT = 3550;
const taskRouter = require("./routes/routes")
module.exports = class Application {
    constructor() {
        this.applicationConfig();
        this.routesConfig();
        this.errorHandling();
        this.createServer();
        this.databaseConfig();

    }
    applicationConfig(){
        app.use(express.json());
        app.use(express.urlencoded({extended : true}))
    }
    createServer() {
        const server = http.createServer(app)
        server.listen(PORT, () => console.log("Run Server On > http://localhost:3550"))
    }
    async databaseConfig() {
        await mongoose.connect("mongodb://localhost:27017/crud_db")
            .then(() => console.log("Connect To DB Successful"))
            .catch(erro => console.log("Cannot Connect To DB"))
    }
    routesConfig() {
        app.use("/task", taskRouter)
    }
    errorHandling() {
        app.use("*", (req, res, next) => {
            return res.status(404).json({
                message: "not found page - route"
            })
        })
        app.use((error, req, res, next) => {
            console.log(error);
            if (error.status) {
                res.status(error.status).json({ ...error })
            } else {
                res.status(503).json({ message: "Unavailable Service" })
            }
        })
    }
}

