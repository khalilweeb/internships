const express = require('express');


const {login, sginup , logout} = require('../controllers/userController');

const router = express.Router();



//add user --sginup
 router.post('/sginup' , sginup);

// login 

router.post('/login' , login)
  
//lohout
router.post("/logout", logout);



module.exports = router;