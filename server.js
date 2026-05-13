// loads environment variables from .env file

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

// connect to MongoDB
connectDB();

// allows cross-origin requests
app.use(cors());
// allows JSON data to be parsed
app.use(express.json());
// allows static files to be served
app.use(express.static(path.join(__dirname, 'views')));

// state routes
app.use('/states', require('./routes/stateRoutes'));

// root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 404 catch-all route
app.all('*splat', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    if (req.accepts('json')) {
        return res.json({ error: '404: Not Found' });
    }
});

// starts the server
mongoose.connection.once('open', () => {
    console.log('MongoDB connection open');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}'`));
});

// logs any errors that occur during the MongoDB connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});