const Education = require("../models/educationModel");


// Create a new Education record
const addEducation = async (req, res) => {
    try {
        const { collegeName, branchName, passoutYear } = req.body;

        if (!collegeName || !branchName || !passoutYear) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const education = new Education({ collegeName, branchName, passoutYear });
        await education.save();

        return res.status(201).json({ message: "Education record created", education });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all Education records
const getAllEducations = async (req, res) => {
    try {
        const educations = await Education.find();
        return res.status(200).json({ educations });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Education by ID
const getEducationById = async (req, res) => {
    try {
        const education = await Education.findById(req.params.eduId);

        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }

        return res.status(200).json({ education });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update an Education record
const updateEducation = async (req, res) => {
    try {
        const { collegeName, branchName, passoutYear } = req.body;
        const education = await Education.findByIdAndUpdate(req.params.eduId, {
            collegeName, branchName, passoutYear
        }, { new: true });

        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }

        return res.status(200).json({ message: "Education record updated", education });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete an Education record
const deleteEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete(req.params.eduId);

        if (!education) {
            return res.status(404).json({ message: "Education record not found" });
        }

        return res.status(200).json({ message: "Education record deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addEducation, getAllEducations, getEducationById, updateEducation, deleteEducation };
