const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    
})

const UserModel = mongoose.model("userlogin",UserSchema)
module.exports = UserModel