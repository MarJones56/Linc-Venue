const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference the Userinfos model
      },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    location: {
        city: String, 
        state: String,
    },
    maxCap: {
      type: Number,
      required: true,
    },
    type_of_venue: {
      type: String,
      required: true,
    },
    timeslot: {
      type: Array,
      required: true,
    },
    image: {
      type: String,
      default: "https://www.montclairartmuseum.org/sites/default/files/styles/fp_widescreen_768x432_/public/2023-10/MAM_0029%20copy.jpg?itok=HOtUXdE8"
    },
    num_of_users: {
      type: Number,
      default: 0, 
    },
});

const VenueModel = mongoose.model('venue', VenueSchema);
module.exports = VenueModel