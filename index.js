const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const helmet=require('helmet')
const morgan=require('morgan')

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

// try app
app.get('/',(req,res)=>{
    res.send('Welcome to Home page')
})

app.get('/users',(req,res)=>{
    res.send('Welcome to Users page')
})


const port=process.env.PORT || 3000

app.listen(port,()=>console.log(`server is listening on port ${port}`))