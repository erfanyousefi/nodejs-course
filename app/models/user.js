const {model, Schema, Types} = require("mongoose")
const UserSchema = new Schema({
    name : {type : String, default : "user"},
    username : {type : String, unique : true, required : true},
    password : {type : String, required : true},
}, {
    timestamps : true,
})
module.exports = model("user", UserSchema)