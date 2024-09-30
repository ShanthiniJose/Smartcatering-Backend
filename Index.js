const express=require('express')
const parser=require('body-parser')
const app=express()
const cors=require('cors')
const db=require('./DbConnection')
const router=require('./Router')


const port=4006
app.use(parser.json())
app.use(cors())
app.use(express.static(`${__dirname}/Upload`))
app.use('/smart',router)

app.listen(port,()=>{
    console.log(port,"created");
    
})










