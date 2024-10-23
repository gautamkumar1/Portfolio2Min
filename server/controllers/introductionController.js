const introductionModel = require("../models/introductionModel");
// Create an introduction
exports.createIntroduction = async (req, res) => {
    try {
        const { fullName, status, title, socialLinks, image } = req.body;
        const introduction = new introductionModel({
            fullName,
            status,
            title,
            socialLinks,
            image
        });

        if(fullName.length < 3){
            return res.status(400).json({
                success: false,
                message: 'Full name must be at least 3 characters long'
            });
        }
        if(title.length < 3){
            return res.status(400).json({
                success: false,
                message: 'Title must be at least 3 characters long'
            });
        }

        await introduction.save();
        return res.status(201).json({
            success: true,
            data: introduction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Error creating introduction'
        });
    }
};

// Get all introductions
exports.getAllIntroductions = async (req, res) => {
    try {
        const introductions = await introductionModel.find();
        return res.status(200).json({
            success: true,
            data: introductions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching introductions'
        });
    }
};

// Get introduction by ID
exports.getIntroductionById = async (req, res) => {
    try {
        const introduction = await introductionModel.findById(req.params.id);

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: introduction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching introduction'
        });
    }
};

// Update an introduction
exports.updateIntroduction = async (req, res) => {
    try {
        const { fullName, status, title, socialLinks, image } = req.body;
        const introduction = await introductionModel.findByIdAndUpdate(
            req.params.id,
            { fullName, status, title, socialLinks, image },
            { new: true, runValidators: true }
        );

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: introduction
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Error updating introduction'
        });
    }
};

// Delete an introduction
exports.deleteIntroduction = async (req, res) => {
    try {
        const introduction = await introductionModel.findByIdAndDelete(req.params.id);

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Introduction deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting introduction'
        });
    }
};
