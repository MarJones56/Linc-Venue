const express = require('express')
const router = express.Router({mergeParams:true})

const mongoose = require('mongoose')
const Activity = mongoose.model('Activity')
const Venue = mongoose.model('venue')
const { book } = require("../models/bookings");

// Endpoint to fetch the list of venues so that User 
// can add an activity that is attached to that venue

router.get('/getallvenuesforselect', async (req, res) => {
  try {
    const venues = await Venue.find();
    res.json({ venues });
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post("/addActivity", (req, res)=>{
    const {name, venueid ,info,timeslot,availability,chargeable, venueLocation,venueAddress, current_user_id} = req.body
    if(!name || !info || !timeslot || !availability || ! chargeable){
        return res.send({"error":"please enter all the details"})
    }
    Venue.find({_id: venueid})
    .then((venue)=>{
        if (venue.length===0){
            return res.send({"error":"venue doesn't exists"})
        }
        const newActivity = new Activity({
            name: name,
            venueid: venueid,
            info: info,
            timeslot: timeslot,
            availability: availability,
            chargeable:chargeable,
            venueLocation: {
              city: venueLocation.city,
              state: venueLocation.state
            },
            venueAddress: venueAddress,
            current_user_id: current_user_id,
        })
        newActivity.save()
        .then((newActivity) => {
            return res.json({"message":"venue details saved successfully",activity:{newActivity}})
        })
        .catch((err) => {
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})



// Endpoint to get activites for a specific user
router.get('/useractivites/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    // console.log(userIdObjectId);
    // Assuming ownerId is a String, change it based on your actual data type
    const userVenues = await Activity.find({ current_user_id: userIdObjectId });
    console.log(userVenues);
    res.json(userVenues);
  } catch (error) {
    console.error('Error fetching user venues:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/delete/:activityid", (req, res) => {
    Activity.findByIdAndDelete({_id:req.params.activityid})
      .then((activity) => {
        if (!activity) {
          return res.status(404).json({ error: "activity not found" });
        }
        return res.status(200).json({ message: "activity deleted successfully" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      });
  });

router.get("/", (req, res) => {
    Activity.find({venueid:req.params.venueid})
    .then((activities) => {
        console.log(req.params.venueid);
        if (!activities){
            return res.status(200).json({"404":"activities not available"})
        }
        return res.send({activities:activities})
    })
    .catch((err)=>{
        console.log(err)
    })
})

// router.get("/:activityid", (req,res) => {
//     Activity.find({_id:req.params.activityid})
//     .then((activity) => {
//         if (!activity){
//             return res.status(200).json({"error":"non existing activity"})
//         }
//         return res.status(200).json({"activity":activity})
//     })
// })


module.exports = router