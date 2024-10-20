const connectDB = require('./config/db');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('config');

// Initialize app
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB
connectDB();



// Test route
app.get('/', (req, res) => res.send("API RUNNING"));


// Routes
app.use('/api/', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/intern', require('./routes/intern'));
app.use('/api/profile/recruiter', require('./routes/recruiter'));
app.use('/api/recruiter', require('./routes/recruiter'));
app.use('/api/apply/', require('./routes/apply'))

// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
