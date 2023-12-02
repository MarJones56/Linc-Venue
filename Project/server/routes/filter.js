const router = require("express").Router();
const UserInfoModel = require("../models/user");
const Activity = require("../models/activity");
const mongoose = require("mongoose");

/// FILTERING STUFF IS BELOW
async function getUserData(filterCriteria) {
  try {
      const userQuery = UserInfoModel.find(filterCriteria);
      const user = await userQuery.exec();
      console.log(user);
      return user;
  } catch (error){
      throw error;
  }
}

router.get('/api/userinfos', async (req, res) => {
  try {
    const { age, gender } = req.query;

    const filterCriteria = {};
    if (gender) {
      filterCriteria.gender = gender;
    }
    if (age === 'Old') {
      filterCriteria.age = { $gte: 50 };
    } else if (age === 'Middle Age') {
      filterCriteria.age = { $gte: 20, $lte: 49 };
    } else if (age === 'Younger') {
      filterCriteria.age = { $lte: 19 };
    }

    const filteredUsers = await UserInfoModel.find(filterCriteria);
    console.log(filteredUsers);
    res.json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/api/activityfilter', async (req, res) => {
  try {
    const { activityName, chargeable, timeslot, venueLocation } = req.query;

    const filterCriteria = {};
    console.log(activityName);
    console.log(venueLocation);

    if (chargeable == 'chargeable'){
      filterCriteria.chargeable = true;
    } else if (chargeable == 'Free'){
      filterCriteria.chargeable = false;
    }
    if (venueLocation) {
      filterCriteria['venueLocation.state'] = venueLocation;
    } 
    if (timeslot) {
      filterCriteria.timeslot = timeslot;
    }
    if (activityName) {
      // Use a regex for case-insensitive partial matching
      filterCriteria.name = { $regex: new RegExp(activityName, 'i') };
    }

    console.log(filterCriteria);
    const filteredUsers = await Activity.find(filterCriteria);
    console.log(filteredUsers);
    res.json(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;