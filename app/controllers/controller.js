const autoBind = require("auto-bind")
const bcrypt = require("bcrypt")
module.exports = class Controller {
    constructor() {
        autoBind(this)
    }
    hashPassword(str) {
        const salt = bcrypt.genSaltSync(15);
        const hashed = bcrypt.hashSync(str, salt);
        return hashed
    }
}