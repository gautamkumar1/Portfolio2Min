const mongoose = require("mongoose");
const introductionModel = require("../models/introductionModel");


exports.createIntroduction = async (req, res) => {
    try {
        const { fullName, status, title, socialLinks, image, about, location } = req.body;
        if(!fullName || !status || !title || !socialLinks || !image || !about || !location) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        // Validate user ID
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);
    
        if (!introductionModel) {
            throw new Error('Introduction model is not defined');
        }

        // Check if an introduction already exists for the user with explicit query
        const existingIntroduction = await introductionModel.findOne({ userId: userId }).exec();
        
        if (existingIntroduction) {
            return res.status(400).json({
                success: false,
                message: 'Introduction already exists. Please update it instead.'
            });
        }
        // Validate the fullName and title length
        if (fullName.length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Full name must be at least 3 characters long'
            });
        }

        if (title.length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Title must be at least 3 characters long'
            });
        }
        const introductionData = {
            userId,
            fullName,
            status,
            title,
            socialLinks,
            image,
            about,
            location
        };

        const introduction = new introductionModel(introductionData);

        const savedIntroduction = await introduction.save();

        return res.status(201).json({
            success: true,
            message: 'Introduction created successfully',
            data: savedIntroduction
        });
    } catch (error) {
        console.error('Error in createIntroduction:', error);
        
        // Provide more specific error messages
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors
            });
        }

        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Duplicate entry error'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating introduction',
            error: error.message
        });
    }
};
// Get introduction by user ID
exports.getIntroduction = async (req, res) => {
    try {
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);
        console.log(`User ID: ${userId}`);
        
        
        // Find introduction for the user
        const introduction = await introductionModel.findOne({ userId: userId }).exec();
        console.log(`Introduction: ${introduction}`);
        
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
        console.error('Error in getIntroduction:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching introduction',
            error: error.message
        });
    }
};

// Update introduction
exports.updateIntroduction = async (req, res) => {
    try {
        const { fullName, status, title, socialLinks, image, about, location } = req.body;
        
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Validate required fields
        if (fullName && fullName.length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Full name must be at least 3 characters long'
            });
        }

        if (title && title.length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Title must be at least 3 characters long'
            });
        }

        // Find existing introduction
        const existingIntroduction = await introductionModel.findOne({ userId }).exec();

        if (!existingIntroduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found. Please create one first.'
            });
        }

        // Prepare update data
        const updateData = {
            ...(fullName && { fullName }),
            ...(status && { status }),
            ...(title && { title }),
            ...(socialLinks && { socialLinks }),
            ...(image && { image }),
            ...(about && { about }),
            ...(location && { location }),
            updatedAt: new Date()
        };

        // Update the introduction
        const updatedIntroduction = await introductionModel.findOneAndUpdate(
            { userId },
            { $set: updateData },
            { new: true, runValidators: true }
        ).exec();

        return res.status(200).json({
            success: true,
            message: 'Introduction updated successfully',
            data: updatedIntroduction
        });
    } catch (error) {
        console.error('Error in updateIntroduction:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating introduction',
            error: error.message
        });
    }
};

// Delete introduction
exports.deleteIntroduction = async (req, res) => {
    try {
        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Find and delete the introduction
        const deletedIntroduction = await introductionModel.findOneAndDelete({ userId }).exec();

        if (!deletedIntroduction) {
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
        console.error('Error in deleteIntroduction:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting introduction',
            error: error.message
        });
    }
};

