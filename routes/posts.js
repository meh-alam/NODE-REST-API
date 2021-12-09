const router=require('express').Router()

router.get('/',(req,res)=>{
    res.send("<h1>POSTS</h1>")
})

router.get('/favorite',(req,res)=>{
    res.send("<h1>FAVORITE POSTS</h1>")
})

module.exports=router