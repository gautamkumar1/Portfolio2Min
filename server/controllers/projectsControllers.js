const Project = require("../models/projectModels");

const addProject = async (req, res) => {
  const { title, description, techstack, githubRepo, liveLink } = req.body;

  try {
    const newProject = new Project({ title, description, techstack, githubRepo, liveLink });
    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, techstack, githubRepo, liveLink } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, techstack, githubRepo, liveLink },
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project updated successfully', updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
};
