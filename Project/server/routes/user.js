const router = require("express").Router()
const bcrypt = require ("bcrypt");
const UserModel = require("../models/user");

//update
router.put("/:id", async (req, res) => {
    console.log(req.body.userId + " == " + req.params.id + "||" + req.body.isAdmin);
    try {
        // Check if the request body contains the necessary information
        if (req.body.userId == req.params.id || req.body.isAdmin) {
            // Check if the request body contains a password and hash it
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }

            // Use findByIdAndUpdate to update the user
            const updatedUser = await UserModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true } // Return the updated user
            );

            if (updatedUser) {
                res.status(200).json("Account updated");
            } else {
                res.status(404).json("User not found");
            }
        } else {
            res.status(403).json("You can only update your account");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});
//delete

router.delete("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
                await UserModel.findByIdAndDelete(req.params.id)
                res.status(200).json("Account updated")
        } catch (err){
            return res.status(403).json("You can only delete your account")
        }
    } else{
        return res.status(403).json("You can only delete your account")
    }
})


//get
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await UserModel.findById(userId)
        : await UserModel.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //get
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const username = req.query.username;
    try {
      const user = userId
        ? await UserModel.findById(userId)
        : await UserModel.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;