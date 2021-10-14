const userModel = require("../models/user");
const Controller = require("./controller");
module.exports = new class authController extends Controller {
    async register(req, res, next) {
        try {
            const { name, username, password } = req.body;
            let messages = [];
            let hashPassword;
            if (!name?.trim()) {
                messages.push({ name: "نام و نام خانوادگی نمیتواند خالی باشد" })
            }
            if (!password?.trim() || password?.length < 8 || password?.length > 16) {
                messages.push({ password: "رمز عبور نمیتواند کمتر از 8 و بیشتر از 16 نویسه باشد" })
            } else {
                hashPassword = this.hashPassword(password)
            }
            if (!username?.trim()) {
                messages.push({ username: "نام کاربری نمیتواند خالی باشد" })
            } else {
                const user = await userModel.findOne({ username });
                if (user) {
                    messages.push({ username: "نام کاربری قبلا استفاده شده است" })
                }
            }
            if (messages.length > 0) {
                return res.json({
                    messages
                })
            }

            const newUser = await userModel.create({name, username, password : hashPassword}).catch(err => {
                throw {message : "ثبت نام شما انجام نشد", status : 500}
            })
            if(newUser){
                return res.status(201).json({
                    status : 201,
                    success : true,
                    message : "ثبت نام شما با موفقیت انجام شد"
                })
            }else{
                return res.status(500).json({
                    status : 500,
                    success : false,
                    message : "ثبت نام شما انجام نشد"
                })

            }

        } catch (error) {
            next(error)
        }
    }
}