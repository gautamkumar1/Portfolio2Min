const skillsModel = require("../models/skillsModel");


const addSkill = async (req, res) => {
  const { category, skill } = req.body;

  if (!['Languages', 'Tools', 'Databases', 'FrameworksAndLibraries'].includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    let skillData = await skillsModel.findOne();
    if (!skillData) skillData = new skillsModel();

    if (!skillData[category].includes(skill)) {
      skillData[category].push(skill);
    }
    await skillData.save();

    res.status(201).json({ message: `Skill added to ${category}`, skillData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all skills
const getSkills = async (req, res) => {
  try {
    const skills = await skillsModel.findOne();
    res.status(200).json(skills || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a skill in a specific category
const updateSkill = async (req, res) => {
  const { category, oldSkill, newSkill } = req.body;

  if (!['Languages', 'Tools', 'Databases', 'FrameworksAndLibraries'].includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const skillData = await skillsModel.findOne();
    if (!skillData) return res.status(404).json({ message: 'Skill not found' });

    const index = skillData[category].indexOf(oldSkill);
    if (index === -1) return res.status(404).json({ message: 'Skill not found in category' });

    skillData[category][index] = newSkill;
    await skillData.save();

    res.status(200).json({ message: 'Skill updated successfully', skillData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a skill from a specific category
const deleteSkill = async (req, res) => {
  const { category, skill } = req.body;

  if (!['Languages', 'Tools', 'Databases', 'FrameworksAndLibraries'].includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  try {
    const skillData = await skillsModel.findOne();
    if (!skillData) return res.status(404).json({ message: 'Skill not found' });

    skillData[category] = skillData[category].filter((s) => s !== skill);
    await skillData.save();

    res.status(200).json({ message: 'Skill deleted successfully', skillData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSkill, getSkills, updateSkill, deleteSkill };