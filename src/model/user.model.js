"use strict";

const Users = (sequelize, DataTypes) =>
    sequelize.define("users", {
      username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : true
        },
      
    });

module.exports = Users;