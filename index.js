const express=require("express")
const connection = require("./db")
const userrrouter = require("./router/userrouter")
const employeeRouter = require("./router/employee")
const cors=require("cors")

require('dotenv').config()
const app=express()
app.use(cors())
app.use(express.json())
app.use("/employees",employeeRouter)
app.use("/users",userrrouter)

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connection
        console.log(`server listening on port ${process.env.PORT} and connected to database`)
    } catch (error) {
       console.log(error) 
    }
})