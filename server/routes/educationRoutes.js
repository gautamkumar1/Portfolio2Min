const express = require('express');
const { addEducation, getAllEducations, getEducationById, updateEducation, deleteEducation } = require('../controllers/educationControllers');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const router = express.Router();

router.post('/user/createEdu', isAuthenticated,addEducation);
router.get('/user/getEdu', isAuthenticated,getAllEducations);
router.get('/user/edubyId/:eduId', isAuthenticated,getEducationById);
router.put('/user/edubyId/:eduId', isAuthenticated,updateEducation);
router.delete('/user/edubyId/:eduId', isAuthenticated,deleteEducation);

module.exports = router;
