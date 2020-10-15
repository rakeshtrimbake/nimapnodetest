const express = require('express');
const app = express();
const cors = require('cors');
require('./src/database/db');
const userRouter = require('./src/user/userrouter');
const categoryRouter = require('./src/category/router');
const productRouter = require('./src/product/router');
const errorCreate = require('http-errors');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
app.use(userRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);

app.use(async(req,res,next) => {
    next(errorCreate.NotFound());
});

app.use((error,req,res,next) => {
    res.status = (error.status || 500);
    res.send({
        error:{
            status: error.status || 500,
            message:error.message
        }
    })
});

app.listen(PORT,() => {
    console.log(`server is running on port `+PORT);
});