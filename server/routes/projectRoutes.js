const express = require('express');
const {getAllProjects , addProject , deleteProject} = require('../controllers/projectsController');7


const router = express();

router.get('/allprojects' , getAllProjects);
router.post('/addproject' , addProject);
router.delete('/deleteproject/:id' , deleteProject);



module.exports = router;