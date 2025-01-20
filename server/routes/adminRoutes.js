const express = require('express');

const {getAllUsers , deleteUser} = require('../controllers/adminController')
const {verifyToken , roleAuthorization } = require('../util/auth');

const router = express();

router.get('/users' , verifyToken , roleAuthorization(['admin']) ,  getAllUsers);


router.delete('/users/:id' , verifyToken , roleAuthorization(['admin']) ,  deleteUser);





module.exports = router