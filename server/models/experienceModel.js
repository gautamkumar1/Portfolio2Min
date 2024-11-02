const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  companyAndRole: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  responsibilities: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;