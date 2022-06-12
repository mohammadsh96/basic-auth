"use strict";
require('dotenv').config();

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const {
    Sequelize,
    DataTypes
} = require("sequelize");

const Users = require("./user.model");

let sequelizeOptions =
    process.env.NODE_ENV === "production" ?
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            native: true
        }
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);



module.exports = {
    db: sequelize,
    Users: Users(sequelize, DataTypes)
};