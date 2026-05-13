const mongoose = require('mongoose');

// Schema
// stateCode = 2-letter state code
// funfacts = array of fun facts
const stateSchema = new mongoose.Schema({
    stateCode: {
        type: String,
        required: true,
        unique: true
    },
    funfacts: [String]
});

module.exports = mongoose.model('State', stateSchema);