const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const helmet=require('helmet')
const morgan=require('morgan')

const app=express()

// importing routes
const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const postsRoute=require('./routes/posts')


// to make dotenv ready to use
dotenv.config()

// connecting mongoose/MongoDB, refer docs connections section
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,
useUnifiedTopology:true},
()=>{
    console.log('connected to MongoDB')
})

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

// using different routes
app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postsRoute)

const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`server is listening on port ${port}`))