const express = require('express');


const {login, sginup} = require('../controllers/userController');

const router = express.Router();



    //add user --sginup
    router.post('/sginup' , sginup);

// login 

router.get('/login' , login)
  




module.exports = router;