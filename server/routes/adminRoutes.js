const express = require('express');

const {getAllUsers} = require('../controllers/adminController')


const router = express();

router.get('/users' , getAllUsers);








module.exports = router