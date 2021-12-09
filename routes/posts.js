const router=require('express').Router()
const Post=require('../models/Post')


// create a post
router.post('/',async(req,res)=>{
    const newPost=new Post(req.body)
    try{
        const savedPost=await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

// update a post
router.put('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).send('Post updated successfully!')
        }
        else
        {
            res.status(403).send('You can update only your post!')
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

// delete a post
router.delete('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.userId===req.body.userId){
            await post.deleteOne()
            res.status(200).send('Post deleted successfully!')
        }
        else
        {
            res.status(403).send('You can delete only your post!')
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

//like a post 

// get a post 

// get timeline post

module.exports=router