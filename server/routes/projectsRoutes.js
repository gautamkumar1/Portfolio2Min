const express = require('express'); 
const { addProject, getProjects, updateProject, deleteProject } = require('../controllers/projectsControllers');
const { isAuthenticated } = require('../middlewares/auth-Middleware');
const router = express.Router();


router.post('/user/projects/addProjects', isAuthenticated,addProject);        
router.get('/user/projects/getProjects', isAuthenticated,getProjects);        
router.put('/user/projects/:id', isAuthenticated,updateProject);  
router.delete('/user/projects/:id', isAuthenticated,deleteProject);
module.exports = router;
