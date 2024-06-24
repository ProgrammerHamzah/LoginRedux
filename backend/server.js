const express=require('express')
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const MongoClient=require('mongodb').MongoClient

const app=express()
app.use(bodyParser.json())

const mongoUrl='mongodb://localhost:27017/coba'
const jwtSecret='222222'

app.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        const client=await MongoClient.connect(mongoUrl)
        const db=client.db()
        const users=db.collection('users')
        const user=await users.findOne({email})
        if(!user){
            res.status(401).json({message:'email invalid'})
            return
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            res.status(401).json({message:'password invalid'})
            return
        }
        const token=jwt.sign({email:user.email}, jwtSecret)
        res.json({token})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
})

app.post('/register', async(req,res)=>{
    try {
        const {email,password,otp}=req.body
        const client=await MongoClient.connect(mongoUrl)
        const db=client.db()
        const users=db.collection('users')
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(409).json({message:'Username already exist'})
            return
        }
        const hashedPassword=await bcrypt.hash(password,10)
        await users.insertOne({email,password:hashedPassword,otp})
        res.status(201).json({message:'User Created'})
    } catch (err) {
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
})

app.listen(3000,()=>{
    console.log('server started on port 3000')
})