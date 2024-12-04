const userRouter = require("./routes/userRouter")
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
require("./config/db")

/// cors \\\
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended : true}))

////<router>////

//////////////////users

app.use("/api/users" , userRouter)

////</router>////


app.listen(process.env.PORT,()=>{
    console.log(`server runnig on port ${process.env.PORT}`);
})