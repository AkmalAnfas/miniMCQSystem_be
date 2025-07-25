var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    paper: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
});
var question = new mongoose.model('Question', schema);
module.exports = question;
