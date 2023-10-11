
const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    email: String,
    role: String,
})

const UserInfoModel = mongoose.model("userInfo", UserInfoSchema)
module.exports = UserInfoModel