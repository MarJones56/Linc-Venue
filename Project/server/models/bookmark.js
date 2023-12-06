const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    activityId:{
        type: String,
        required: true,
    },
});

const bookmark = mongoose.model("bookmark",bookingSchema);
module.exports = bookmark;
