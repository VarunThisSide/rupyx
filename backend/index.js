const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT
const cors=require('cors')
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const mainRouter=require('./routes/index')
app.use('/api/v1/',mainRouter)

app.listen(port)