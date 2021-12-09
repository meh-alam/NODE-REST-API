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
        res.status(500).json(err.message)
    }
})

//like / dislike a post 
router.put('/:id/like',async(req,res)=>{
        // liking a post
        const post=await Post.findById(req.params.id)
        if(post.userId!==req.body.userId){
            try{
                if(!post.likes.includes(req.body.userId)){
                    await Post.updateOne({$push:{likes:req.body.userId}})
                    res.status(200).send('Post liked!')
                }
            // disliking a post
                else{
                    await Post.updateOne({$pull:{likes:req.body.userId}})
                    res.status(200).send('Post disliked!')
                }
            }
            catch(err){
                res.status(500).json(err.message)
            }
        }
        else{
            res.status(403).send('You can not like your own post!')
        }
    }
)

// get a post 

// get timeline post

module.exports=router