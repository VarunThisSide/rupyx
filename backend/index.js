const express=require('express')
const app=express()
const port=3000
const cors=require('cors')
app.use(express.json())
app.use(cors())

const mainRouter=require('./routes/index')
app.use('/api/v1/',mainRouter)

app.listen(port , ()=>{
    console.log(`Listening to port : ${port}`)
})