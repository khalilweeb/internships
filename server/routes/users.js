const express = require('express');


const {login, sginup , logout, getUserById} = require('../controllers/userController');

const router = express.Router();



//add user --sginup
 router.post('/sginup' , sginup);

// login 

router.post('/login' , login)
  
//lohout
router.post("/logout", logout);

//get one user 

router.post('/getuser/:id', getUserById);

module.exports = router;