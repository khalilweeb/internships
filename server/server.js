const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const usersRoutes = require('./routes/users');
const adminRouters = require('./routes/adminRoutes');

require('dotenv').config();


const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Allow your React app's domain
    credentials: true, // Allow cookies and credentials (like token)
  }));

app.use((req , res , next) => {
    console.log(req.method , req.path);
    next();
});
app.use(cookieParser()); 
app.use('/users' , usersRoutes);
app.use('/admin' , adminRouters);
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log('db connected and listening');
        
    });

})
.catch(error => {
    console.log(error)
})