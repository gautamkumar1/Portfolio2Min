require('dotenv').config()
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const introRoutes = require("./routes/introductionRoutes")
const eduRoutes = require("./routes/educationRoutes")
const skillRoutes = require("./routes/skillsRoutes")
const experienceRoute = require("./routes/experienceRoutes")
const projectsRoute = require("./routes/projectsRoutes")
const connectDb = require('./utils/dbConnect');
const app = express();
const morgan = require('morgan');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api',authRoutes)
app.use('/api',introRoutes)
app.use('/api',eduRoutes)
app.use('/api',skillRoutes)
app.use('/api',experienceRoute)
app.use('/api',projectsRoute)
const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})