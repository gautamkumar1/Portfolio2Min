const express = require('express'); 
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const { addSkill, getSkills, updateSkill, deleteSkill } = require('../controllers/skillsControllers');
const router = express.Router();

router.post('/user/skills/addSkills', isAuthenticated,addSkill);
router.get('/user/skills/getSkills', isAuthenticated,getSkills);
router.put('/user/skills/updateSkills', isAuthenticated,updateSkill);
router.delete('/user/skills/deleteSkills', isAuthenticated,deleteSkill);

module.exports = router;
