const Experience = require("../models/experienceModel");

// Add new experience
const addExperience = async (req, res) => {
    try {
      const { companyAndRole, role, duration, responsibilities } = req.body; 
  
      // Validate that all required fields are present
      if (!companyAndRole || !role || !duration || !responsibilities) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const experience = new Experience({
        companyAndRole,
        role,
        duration,
        responsibilities,
      });
  
      await experience.save();

      res.status(201).json(experience);
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };
  

// Get all experiences
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single experience by ID
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update experience by ID
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete experience by ID
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};