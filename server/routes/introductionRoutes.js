
const express = require('express');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { createIntroduction, getIntroduction, updateIntroduction, deleteIntroduction } = require('../controllers/introductionController');
const router = express.Router();
router.post('/user/createIntro', isAuthenticated,createIntroduction);
router.get('/user/getIntro', isAuthenticated,getIntroduction);
router.put('/user/:introId', isAuthenticated,updateIntroduction);
router.delete('/user/:introId', isAuthenticated,deleteIntroduction);

module.exports = router;
