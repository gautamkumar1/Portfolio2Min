const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techstack: [{ type: String, required: true }],
  githubRepo: { type: String, required: true },
  liveLink: { type: String }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;