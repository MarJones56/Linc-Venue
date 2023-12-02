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
    venueName:{
        type:String,
        required: true
    },
    activityName:{
        type:String,
        required: true
    },
    customerId:{
        type:String
    },
    activityId:{
        type:String,
        required:true
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
    court: {
        type:String
    },
    time: {
        type:String
    },
    payment_status:{
        type:String
    }
})

const book = mongoose.model("bookings",bookingSchema)
module.exports = book;

// module.exports.book =  book;