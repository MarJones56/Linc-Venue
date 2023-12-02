const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },

    role: {
        type: String,
        required: true,
    },

    fname: {
        type: String,
        required: true,
    },

    lname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 10,
        max: 120,
    },

    profilePicture: {
        type: String,
        default: "https://cdn.vectorstock.com/i/preview-1x/71/90/blank-avatar-photo-icon-design-vector-30257190.jpg"
    },

    profileBanner: {
        type: String,
        default: "https://d360wc4uc6n3i9.cloudfront.net/assets/images/hero-bkg-764e08457f41a9cdc00603bd399e6195.jpg"
    },

    profileBio: {
        type: String,
        max: 200,
    },

    phoneNumber: {
        type: Number,
        min: 1000000000,
        max: 9999999999,
    },

    location: {
        type: String,
        max: 50,
    },

    profileBio: {
        type: String,
        max: 200,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }
    
})

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel