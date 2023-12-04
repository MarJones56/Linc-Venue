const express = require('express')
const router = express.Router({mergeParams:true})

const mongoose = require('mongoose')
const Activity = mongoose.model('Activity')
const Venue = mongoose.model('venue')
const { book } = require("../models/bookings");
const User = require("../models/user");
const Booking = require('../models/bookings');
const nodemailer = require('nodemailer');

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
    if(!name || !info || !timeslot || !availability){
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
    const userVenues = await Activity.find({ current_user_id: userIdObjectId });
    console.log(userVenues);
    res.json(userVenues);
  } catch (error) {
    console.error('Error fetching user venues:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to send emails
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: 'benanu1zaku@gmail.com', // Use the email address associated with your SendGrid account
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Endpoint for booking an activity
router.post('/bookActivity', async (req, res) => {
    try {
        const { activityId, userId } = req.body;
        const activity = await Activity.findById(activityId);

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        // Check if the activity has reached its capacity
        if (activity.num_of_users >= activity.availability) {
            return res.status(400).json({ message: 'Activity has reached its capacity' });
        }

        // Update the activity's num_of_users and save
        activity.num_of_users += 1;
        await activity.save();

        // Create a new booking document
        const booking = new Booking({
            uid: userId,
            venueId: activity.venueid,
            venueName: activity.venueName,
            activityName: activity.name,
            customerId: userId,
            activityId: activityId,
            bookingDate: new Date(),
            venueName: activity.venueName,
            time: activity.timeslot,
            payment_status: 'Pending',
        });
        await booking.save();

        // Retrieve user email using userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userEmail = user.email;
        console.log(userEmail);
        // Retrieve owner email using current_user_id
        const owner = await User.findById(activity.current_user_id);
        if (!owner) {
            return res.status(404).json({ message: 'Activity owner not found' });
        }
        const ownerEmail = owner.email;
        console.log(ownerEmail);

        // Send emails to the user who booked and the activity owner
        const userSubject = 'Booking Confirmation';
        const ownerSubject = 'New Booking';

        const userHtml = `<p>Thank you for booking the activity ${activity.name}.</p>`;
        const ownerHtml = `<p>New booking for your activity ${activity.name}.</p>`;

        await sendEmail(userEmail, userSubject, userHtml);
        // await sendEmail(ownerEmail, ownerSubject, ownerHtml);

        return res.status(200).json({ message: 'Activity booked successfully', booking });
    } catch (error) {
        console.error('Error booking activity:', error);
        return res.status(500).json({ message: 'Internal server error' });
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


module.exports = router