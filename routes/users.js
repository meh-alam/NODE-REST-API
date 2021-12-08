const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
        await User.findByIdAndUpdate(req.params.id, {$set: req.body,});
      res.status(200).json("Account has been updated successfully!");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
          await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted successfully!");
      } catch (err) {
        return res.status(500).json(err.message);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

// get a user
router.get('/:id',async(req,res)=>{
    try{
        // here we are getting all the props inside the user doc
        // so we need to remove unnecessary props (we dont want/want to hide) like password, createdAt
        const user= await User.findById(req.params.id)
        // spreading the user document
        const {password,createdAt,updatedAt,isAdmin, ...other}=user._doc
        // sending just the remaining (other) props as a response
        res.status(200).json(other)
    }
    catch(err)
    {
        res.status(500).send(err.message)
    }
})

// follow a user
router.put('/:id/follow',async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id)
            const currentUser=await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await User.updateOne({$push: {followers:req.body.userId}})
                await currentUser.updateOne({$push: {following:req.params.id}})
                res.status(200).send('User has been followed!')
            }
            else
            {
                res.status(403).send('You already follow this user!')
            }
        }
        catch(err)
        {
            res.status(500).send(err.message)
        }
    }
    else{
        res.status(403).send('You can not follow yourself!')
    }
})

// unfollow a user

module.exports=router