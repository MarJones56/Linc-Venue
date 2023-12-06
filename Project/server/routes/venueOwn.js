const router = require("express").Router();
const VenueModel = require("../models/venue");
const mongoose = require("mongoose");
// Route to handle venue creation
router.post('/add-venue', async (req, res) => {
  try {
    const {
      ownerId,
      name,
      info,
      address,
      maxCapacity,
      venueType, // Assuming you are using 'selectedType' for the type of venue
      venueCity,
      venueState,
      venueImage,
      venueTimeslots,
    } = req.body;

    console.log(name);
    console.log('benjamin');
    console.log(venueType);
    // Create a new venue instance
    const newVenue = new VenueModel({
      ownerId: ownerId,
      name: name,
      address: address,
      info: info,
      location: {
        city: venueCity,
        state: venueState,
      },
      maxCap: maxCapacity,
      type_of_venue: venueType,
      timeslot: venueTimeslots,
      image: venueImage,
    });

    // Save the venue to the database
    const savedVenue = await newVenue.save();

    res.json({ success: true, venue: savedVenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Endpoint to get venues for a specific user
router.get('/userVenues/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userIdObjectId = new mongoose.Types.ObjectId(userId);
    console.log(userIdObjectId);
    // Assuming ownerId is a String, change it based on your actual data type
    const userVenues = await VenueModel.find({ ownerId: userIdObjectId });

    res.json(userVenues);
  } catch (error) {
    console.error('Error fetching user venues:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deleteVenue/:id', async (req, res) => {
  const venueId = req.params.id;

  try {
    // Find the venue by ID and remove it
    const deletedVenue = await VenueModel.findByIdAndRemove(venueId);

    if (!deletedVenue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    return res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error) {
    console.error('Error deleting venue:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;