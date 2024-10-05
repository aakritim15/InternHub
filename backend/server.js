const connectDB = require('./config/db')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
connectDB();

app.use(express.json({extended: false}))

app.get('/', (req,res)=> res.send("API RUNNING"))

app.use('/api/' , require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
const PORT = process.env.PORT || 1000
app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
