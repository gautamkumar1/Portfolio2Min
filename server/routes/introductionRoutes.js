
const express = require('express');
const { createIntroduction, getAllIntroductions, getIntroductionById, updateIntroduction, deleteIntroduction } = require('../controllers/introductionController');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const router = express.Router();
router.post('/user/createIntro', isAuthenticated,createIntroduction);
router.get('/user/getIntro', isAuthenticated,getAllIntroductions);
router.get('/user/:introId', isAuthenticated,getIntroductionById);
router.put('/user/:introId', isAuthenticated,updateIntroduction);
router.delete('/user/:introId', isAuthenticated,deleteIntroduction);

module.exports = router;
