const User = require("../models/authModel");
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 });
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(username.length < 3){
            return res.status(400).json({message:"Username must be at least 3 characters"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = await User.create({
            username,
            email,
            password
        })
        const jwtToken = await newUser.generateToken();
        return res.status(201).json({message:"User created successfully",user:newUser,token:jwtToken});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordCorrect = await existingUser.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Password is incorrect"});
        }
        const jwtToken = await existingUser.generateToken();
        return res.status(200).json({message:"User logged in successfully",user:existingUser,token:jwtToken});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const logout = async (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "User logged out!",
        });
}

const getEmail = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username) {
            return res.status(400).json({ message: "Username parameter is missing" });
        }
        const cacheKey = `edu_${username}`;
        console.log(`Cache key: ${cacheKey}`);
        // Check if data exists in cache
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log('Serving from cache');
            return res.status(200).json({
                success: true,
                userEmail: cachedData
            });
        }
        const email = await User.findOne({ username }).select("email");
        console.log(`TTL Limited Expire thats why serving from database`);
        const emailObject = email.toObject();

        cache.set(cacheKey, emailObject);
        
        if (!email) {
            return res.status(404).json({ message: "Email not found" });
        }
        return res.status(200).json({ message: "Email found", userEmail: emailObject });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports = { register, login,logout,getEmail}