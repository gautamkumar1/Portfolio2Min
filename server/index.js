require('dotenv').config()
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const introRoutes = require("./routes/introductionRoutes")
const eduRoutes = require("./routes/educationRoutes")
const connectDb = require('./utils/dbConnect');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api',authRoutes)
app.use('/api',introRoutes)
app.use('/api',eduRoutes)
const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})