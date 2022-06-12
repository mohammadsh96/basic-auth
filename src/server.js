'use strict'; 
require('dotenv').config();
const PORT = process.env.PORT || 3030;
const express = require("express");
const app = express();
const notFoundHandler = require("./handles/404");
const errorHandler = require("./handles/500");
const usersRouter = require("../src/routes/user.route");

app.use(express.json());




app.use(usersRouter);
app.use("*", notFoundHandler);

app.use(errorHandler); 


function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Listen and Running on port ${PORT}`);
    });
}

module.exports = {
    app: app,
    start: start,
};