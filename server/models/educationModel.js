const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    passoutYear: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
