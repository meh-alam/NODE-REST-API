const router=require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')

// REGISTER
router.post('/register',async(req,res)=>{

    try{
        // encrypting the password using bcrypt
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)

        // creating new user obj by picking data from req body
        const newUser= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        })
        
        // saving the user to d database
        const user=await newUser.save()
        res.status(200).json(user)
    }
    catch(err)
    {
        console.log(err);
    }
})

module.exports=router
