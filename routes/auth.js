const router=require('express').Router()
const User=require('../models/User')

router.get('/register',async(req,res)=>{
    const user= await new User({
        username:'mehtab',
        email:'mehtab@gmail.com',
        password:'123456'
    })
    await user.save()
    res.send('Ok')
})

module.exports=router