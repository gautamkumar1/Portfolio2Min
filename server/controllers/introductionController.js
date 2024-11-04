const mongoose = require("mongoose");
const introductionModel = require("../models/introductionModel");
const NodeCache = require('node-cache');
const User = require("../models/authModel");
const cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes


exports.createIntroduction = async (req, res) => {
    try {
        const { fullName, status, title, socialLinks, image, about, location } = req.body;

        // Check for required fields
        if (!fullName || !status || !title || !socialLinks || !image || !about || !location) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate user authentication
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Fetch username from the User model
        const user = await User.findById(userId).select('username'); // Assuming 'username' is a field in your User model
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const introductionData = {
            userId,
            username: user.username, // Automatically set the username from the user model
            fullName,
            status,
            title,
            socialLinks,
            image,
            about,
            location
        };

        // Check if an introduction already exists for the user
        const existingIntroduction = await introductionModel.findOne({ userId }).exec();

        if (existingIntroduction) {
            return res.status(400).json({
                success: false,
                message: 'Introduction already exists. Please update it instead.'
            });
        }

        const introduction = new introductionModel(introductionData);
        const savedIntroduction = await introduction.save();

        return res.status(201).json({
            success: true,
            message: 'Introduction created successfully',
            data: savedIntroduction
        });
    } catch (error) {
        console.error('Error in createIntroduction:', error);

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

        const userId = req.user.id;
        const cacheKey = `intro_${userId}`;
        console.log(`Cache key: ${cacheKey}`);


        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);
        console.log(`Cached data: ${cachedData}`);
        
        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        // If not cached, fetch from the database
        const introduction = await introductionModel.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
        console.log(`TTL Limited Expire thats why serving from database`);
        
        console.log(`Introduction: ${introduction}`);

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }
        // Convert Mongoose document to plain JavaScript object before caching
        const introObject = introduction.toObject();

        // Store the plain object introduction in cache
        cache.set(cacheKey, introObject);

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
exports.getIntroductionForPortfolio = async (req, res) => {
    try {
        const username = req.params.username;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username parameter is missing'
            });
        }

        const cacheKey = `intro_${username}`;
        console.log(`Cache key: ${cacheKey}`);

        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);
        console.log(`Cached data: ${cachedData}`);

        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                data: cachedData
            });
        }

        // If not cached, fetch from the database
        const introduction = await introductionModel.findOne({ username }).exec();
        console.log('Serving from database');

        if (!introduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        // Convert Mongoose document to plain JavaScript object before caching
        const introObject = introduction.toObject();

        // Store the plain object introduction in cache with a TTL
        cache.set(cacheKey, introObject);

        return res.status(200).json({
            success: true,
            data: introObject
        });
    } catch (error) {
        console.error('Error in getIntroductionForPortfolio:', error);
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
        cache.del(`intro_${userId}`);
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

        const userId = req.user.id;
        const cacheKey = `intro_${userId}`;

        // Find and delete the introduction
        const deletedIntroduction = await introductionModel.findOneAndDelete({ userId: new mongoose.Types.ObjectId(userId) });

        if (!deletedIntroduction) {
            return res.status(404).json({
                success: false,
                message: 'Introduction not found'
            });
        }

        // Remove the introduction from the cache if it exists
        cache.del(cacheKey);

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


