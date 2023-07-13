const express=require("express")
const connection = require("./db")
const userrrouter = require("./router/userrouter")


require('dotenv').config()
const app=express()
app.use(express.json())
app.use("/users",userrrouter)

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log(`server listening on port ${process.env.PORT} and connected to database`)
    } catch (error) {
       console.log(error) 
    }
})