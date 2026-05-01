require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/states', require('./routes/stateRoutes'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.all('*splat', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    if (req.accepts('json')) {
        return res.json({ error: '404: Not Found' });
    }
});

mongoose.connection.once('open', () => {
    console.log('MongoDB connection open');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}'`));
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});