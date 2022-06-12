"use strict";
const express = require("express");

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const {Users} = require("../model/index.model");

const usersRouter = express.Router();

usersRouter.post("/signup", SignUp);
usersRouter.post("/signin", Signin);
usersRouter.get("/Users", allUsers);


async function allUsers (req, res){
    
        const allUsers = await Users.findAll();
        console.log("helloooo")
        res.status(200).json(allUsers);
 


}

 async function SignUp (req, res){
  try {
        let username = req.body.username;
        let valid = await Users.findOne({ where: { username: username } });
        if (valid) {
            res.status(500).send("this username is already exist");
        } else {
            
        
      let password = await bcrypt.hash(req.body.password, 10);

      console.log('username', username);
      console.log('password', password);

      const record = await Users.create({
          username: username,
          password: password,
      })
      res.status(201).json(record);
    }
  } catch (e) {
      throw new Error('signup error');
  }
};

async function Signin(req, res) {
  if (req.headers.authorization) {
      //Basic YWhtYWQ6YWhtYWQxMjM=
      let basicHeaderParts = req.headers.authorization.split(" ");
      //basicHeaderParts = ['Basic','YWhtYWQ6YWhtYWQxMjM=']

      let encoded = basicHeaderParts[1];
      //encoded = 'YWhtYWQ6YWhtYWQxMjM='

      let decoded = base64.decode(encoded);
      //decoded = "username:password"
      let username = decoded.split(":")[0];
      let password = decoded.split(":")[1];

      /* let [username,password] = decoded.split(":");*/
      try {
          const user = await Users.findOne({ where: { username: username } });
          const valid = await bcrypt.compare(password, user.password);
          if (valid) {
              res.status(200).json({
                  user
              });
          } else {
              res.status(500).send("wrong username or password");
          }
      } catch {
          res.status(500).send("app error");
      }
  }
};


module.exports = usersRouter;