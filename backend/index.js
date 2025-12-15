const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT
const cors=require('cors')
app.use(express.json())
app.use(cors())

const mainRouter=require('./routes/index')
app.use('/api/v1/',mainRouter)

app.listen(port)