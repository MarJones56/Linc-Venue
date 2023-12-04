const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    info:{
        type: String
    },
    timeslot:{
        type: String,
        required: true
    },
    availability:{
        type: Number,
        required: true
    },
    venueid:{
        type: String,
        required: true
    },
    chargeable:{
        type:Boolean,
    },
    image: {
      type: String,
    },
    venueLocation: {
      city: String, 
      state: String,
    },
    venueAddress: {
      type: String,
      required: true,
    },
    current_user_id: {
      type: String,
      required: true,
    },
    num_of_users: {
      type: Number,
      default: 0, // Default value is 0
    },
})
const AcitivityModel = mongoose.model("Activity",activitySchema)
module.exports = AcitivityModel