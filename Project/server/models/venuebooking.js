const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    venueId:{
        type:String,
        required: true
    },
    venueOwnerId:{
        type:String
    },
    bookingDate:{
        type:Date,
        required:true
    },
    paymentIntentId:{
        type:String
    },
    venueName:{
        type:String
    },
    time: {
        type:String
    },
    payment_status:{
        type:String
    }
})

const book = mongoose.model("venuebookings",bookingSchema)
module.exports = book;