const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const helmet=require('helmet')
const morgan=require('morgan')

const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')


// to make dotenv ready to use
dotenv.config()

// connecting mongoose/MongoDB
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

const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`server is listening on port ${port}`))