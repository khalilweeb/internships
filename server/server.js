const express = require('express');

const adminRouters = require('./routes/adminRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());


app.use((req , res , next) => {
    console.log(req.method , req.path);
    next();
});

app.use('/admin' , adminRouters);

app.listen( process.env.PORT,() => {
    console.log('app is listening ')
})