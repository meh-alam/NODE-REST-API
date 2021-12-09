const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
},
// whenver this object is updated it will automatically update our timestamps
{timestamps:true}
)

module.exports=mongoose.model('post',postSchema)