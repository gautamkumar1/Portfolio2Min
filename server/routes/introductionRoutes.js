
const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { createIntroduction, getIntroduction, updateIntroduction, deleteIntroduction, getIntroductionForPortfolio } = require('../controllers/introductionController');
const router = express.Router();
router.post('/user/createIntro', isAuthenticated,createIntroduction);
router.get('/user/getIntro', isAuthenticated,getIntroduction);
router.get('/user/getIntroForPortfolio/:username', getIntroductionForPortfolio);
router.put('/user/:introId', isAuthenticated,updateIntroduction);
router.delete('/user/deleteIntro', isAuthenticated,deleteIntroduction);

module.exports = router;
