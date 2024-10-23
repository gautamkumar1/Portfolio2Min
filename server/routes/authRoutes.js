const express = require('express'); 
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/logout', logout);

module.exports = router;
