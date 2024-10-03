const connectDB = require('./config/db')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
connectDB();


app.get('/', (req,res)=> res.send("API RUNNING"))
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
