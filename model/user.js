const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        type: String, 
        required: true
    },
    exam_id: {
        type: String, 
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Result = mongoose.model('Result', schema);
module.exports = Result;
