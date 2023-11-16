const router = require("express").Router();
const UserInfoModel = require("../models/user");
const mongoose = require("mongoose");

/// FILTERING STUFF IS BELOW
//FIltering stuff
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

// router.get('/api/userinfos', async (req, res) => {
//   try{
//     const { age, gender } = req.query;

//     const filterCriteria = {};
//     if (gender) {
//       filterCriteria.gender = gender;
//     }
//     if (age === 'Old') {
//       filterCriteria.age = { $gte: 50 }; // Ages greater than or equal to 50
//     } else if (age === 'Middle Age') {
//       filterCriteria.age = { $gte: 20, $lte: 49 }; // Ages between 30 and 49
//     } else if (age === 'Younger') {
//       filterCriteria.age = { $lte: 19 }; // Ages less than or equal to 29
//     }
//     const filteredUsers = await UserInfoModel.find(filterCriteria);

//     res.json(filteredUsers);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });
//   console.log(filterCriteria);
//   users = getUserData(filterCriteria)
//     .then((users) => {
//       // Respond with the filtered data
//       console.log(users);
//       res.json(users);
//     })
//     .catch((error) => {
//       // Handle errors
//       console.error('Error fetching users:', error);
//       console.log('error');
//       res.status(500).json({ error: 'An error occurred' });
//     });
// });

module.exports = router;