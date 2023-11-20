const router = require("express").Router()
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const Message = require("../models/Message");
const jwt = require('jsonwebtoken')


router.post('/register',(req,res)=>{
  const {username, email, password, fname, lname, role, gender, age} = req.body;

  bcrypt.hash(password,10)
  .then(hash=>{
	  UserModel.create({username,email,password: hash, role, fname, lname, gender, age})
	  .then(user => res.json("Success"))
	  .catch(err=> res.json(err))

	  console.log("user created");
  }).catch(err => res.json(err))

})

// Getting User Info for Profile
router.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, 'jwt-secret-key', {}, async (err, userData) => {
      if (err) {
        // Handle verification error, e.g., unauthorized access
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Assuming your user model is UserInfoModel
      const user = await UserModel.findById(userData.id);

      if (!user) {
        // No user found with the given ID
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user data
      const { username, email, role, _id } = user;
      console.log(username, role);
      res.json({ username, email, role, _id });
    });
  } else {
    // No token found, user is not authenticated
    res.status(401).json({ error: 'Unauthorized' });
  }
});

//LOGIN
router.post('/login',(req,res)=>{
  const {email,password}=req.body;
  UserModel.findOne({email: email})
  .then(user=>{
	  if(user){
		  bcrypt.compare(password,user.password,(err,response)=>{
			  if(response){
				  const token= jwt.sign({_id: user._id},
				  "jwt-secret-key")
				  res.cookie('token',token)
				  return res.status(200).json(user)
			  }else{
				  return res.json("The password is incorrect")
			  }
		  })
	  }else{
		  return res.json("No record")
	  }
  })
})

module.exports = router;
