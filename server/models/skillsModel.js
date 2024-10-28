const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  Languages: [{ type: String }],
  Tools: [{ type: String }],
  Databases: [{ type: String }],
  FrameworksAndLibraries: [{ type: String }],
}, { timestamps: true });

const skillsModel = mongoose.model('Skills', skillSchema);
module.exports = skillsModel;
