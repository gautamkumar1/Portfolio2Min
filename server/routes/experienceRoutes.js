const express = require('express');

const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { addExperience, getExperiences, getExperienceById, updateExperience, deleteExperience } = require('../controllers/experienceController');
const router = express.Router();

router.post('/user/createExp', isAuthenticated,addExperience);
router.get('/user/getExp', isAuthenticated,getExperiences);
router.get('/user/expbyId/:id', isAuthenticated,getExperienceById);
router.put('/user/expbyId/:id', isAuthenticated,updateExperience);
router.delete('/user/expbyId/:eduId', isAuthenticated,deleteExperience);

module.exports = router;
