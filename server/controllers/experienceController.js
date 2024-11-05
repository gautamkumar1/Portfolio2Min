const User = require("../models/authModel");
const Experience = require("../models/experienceModel");
const mongoose = require("mongoose");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });
// Add new experience
const addExperience = async (req, res) => {
    try {
      const { companyAndRole, duration, responsibilities } = req.body; 
  
      // Validate that all required fields are present
      if (!companyAndRole || !duration || !responsibilities) {
        return res.status(400).json({ error: "All fields are required" });
      }
      if (!req.user || !req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'User not authenticated'
        });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Fetch username from the User model
    const user = await User.findById(userId).select('username');
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
      const experienceData = {
        companyAndRole,
        duration,
        responsibilities,
        userId: userId,
        username: user.username
      }
      const existingExperience = await Experience.findOne({ userId: userId });
      if (existingExperience) {
        return res.status(409).json({ message: "Experience record already exists. Please update it instead." });
      }
      const experience = new Experience(experienceData);
      const savedExperience = await experience.save();
      res.status(201).json({ message: "Experience added successfully" ,experienceData:savedExperience});
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };
  

// Get experiences
const getExperiences = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'User not authenticated'
        });
    }

    const userId = req.user.id;
    const cacheKey = `exp_${userId}`;
    console.log(`Cache key: ${cacheKey}`);
    // Check if data exists in cache
    const cachedData = cache.get(cacheKey);
    // console.log(`Cached data: ${cachedData}`);

    if (cachedData) {
        console.log('Serving from cache');
        return res.status(200).json({
            success: true,
            data: cachedData
        });
    }
     // If not cached, fetch from the database
     const experience = await Experience.findOne({ userId: new mongoose.Types.ObjectId(userId) }).exec();
     console.log(`TTL Limited Expire thats why serving from database`);
     

    if (!experience) {
        return res.status(404).json({ message: "Experience record not found" });
    }

    const expObject = experience.toObject();

    cache.set(cacheKey, expObject);
    return res.status(200).json({ experienceData: expObject });
} catch (error) {
    return res.status(500).json({ message: error.message });
}
};

// get Experience for portfolio
const getExperienceForPortfolio = async (req, res) => {
  try {
      const username = req.params.username;

      if (!username) {
          return res.status(400).json({
              success: false,
              message: 'Username parameter is missing'
          });
      }

      const cacheKey = `exp_${username}`;
      console.log(`Cache key: ${cacheKey}`);
      // Check if data exists in cache
      const cachedData = cache.get(cacheKey);

      if (cachedData) {
          console.log('Serving from cache');
          return res.status(200).json({
              success: true,
              data: cachedData
          });
      }

      // If not cached, fetch from the database
      const experience = await Experience.findOne({ username }).exec();
      console.log(`TTL Limited Expire thats why serving from database`);

      if (!experience) {
          return res.status(404).json({ message: "Experience record not found" });
      }

      const expObject = experience.toObject();

      cache.set(cacheKey, expObject);

      
      return res.status(200).json({ experienceData: expObject });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
}

// Update experience by ID
const updateExperience = async (req, res) => {
  try {
    const { companyAndRole,duration, responsibilities } = req.body; 
    // Validate user authentication
    if (!req.user || !req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'User not authenticated'
        });
    }
    const username = req.user.username;
    // console.log(`Username: ${username}`);
    

    if (!username) {
        return res.status(400).json({
            success: false,
            message: 'Username parameter is missing'
        });
    }
    const userId = new mongoose.Types.ObjectId(req.user.id);
    console.log(`User ID: ${userId}`);
    
    const experience = await Experience.findOneAndUpdate(
        { userId: userId }, 
        { companyAndRole,duration, responsibilities },
        { new: true, runValidators: true }
    ).exec();
    
    
    if (!experience) {
        return res.status(404).json({ message: "Experience record not found" });
    }
    cache.del(`exp_${userId}`);
    cache.del(`exp_${username}`);
    return res.status(200).json({ message: "Experience record updated", experienceUpdated: experience });
} catch (error) {
    return res.status(500).json({ message: error.message });
}
};

// Delete experience by ID
const deleteExperience = async (req, res) => {
  try {
         
    if (!req.user || !req.user.id) {
       return res.status(401).json({
           success: false,
           message: 'User not authenticated'
       });
   }
   const username = req.user.username;
   
   

   if (!username) {
       return res.status(400).json({
           success: false,
           message: 'Username parameter is missing'
       });
   }
   const userId = new mongoose.Types.ObjectId(req.user.id);
   const deletedExperience = await Experience.findOneAndDelete({ userId: userId }).exec();
   cache.del(`exp_${userId}`);
   cache.del(`exp_${username}`);
   if (!deletedExperience) {
       return res.status(404).json({ message: "Experience record not found" });
   }

   return res.status(200).json({ message: "Experience record deleted" });
} catch (error) {
   return res.status(500).json({ message: error.message });
}
};

module.exports = {
  addExperience,
  getExperiences,
  getExperienceForPortfolio,
  updateExperience,
  deleteExperience,
};