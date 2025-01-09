const express = require('express');

const router = express.Router();

    // get all students 
    router.get('/students' , (req , res , next) => {
        res.send('get all students');

    });

    //get all framer
    router.get('/framers' , (req , res , next) => {
        res.send('get ALL framerS');

    });

      // delete one students 
      router.delete('/students/:id' , (req , res , next) => {
        res.send('DELETE A student');

    });

    //delete one framer
    router.delete('/framers/:id' , (req , res , next) => {
        res.send('DELETE A  framer');

    });


      //update student 
      router.patch('/students/:id' , (req , res , next) => {

        res.send('update A  student');

    });

    //update framer 
    router.patch('/framers/:id' , (req , res , next) => {
        res.send('update A  framer');

    });









module.exports = router;