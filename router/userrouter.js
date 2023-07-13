const express = require("express");
const { User } = require("../model/usermodel");
const bcrypt = require("bcrypt");
const userrrouter = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const blacklistmodel = require("../model/blacklist.model");
const auth = require("../middleware/Auth");
require("dotenv").config();
userrrouter.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(404).send({ error: err.message });
      } else {
        const user = { email: email, password: hash, name: name };
        try {
          const newuser = new User(user);
          await newuser.save();
          const userget = await User.findOne({ email: email });
        
          res.status(200).json(userget);
        } catch (error) {
          res.status(404).json({
           error: error.message
          });
        }
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});
userrrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ name: "prash" }, process.env.SECRATE_KEY, {
            expiresIn: "1day",
          });
          const rtoken = jwt.sign({ name: "prash" }, process.env.SECRATE_KEY_REFRESH, {
            expiresIn: "7day",
          });
          res.send({ message: "Login successfully", token, rtoken });
        } else {
          res.status(404).json({ msg: "you must be registered" });
        }
      });
    } else {
      res.status(403).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(403).json({ message });
  }
});
userrrouter.get("/logout", auth, async(req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const block=await blacklistmodel.findById("6486aa5b59aeb2ae81d2a6ca")
       block.token.push(token);
       const check=await blacklistmodel.findByIdAndUpdate("6486aa5b59aeb2ae81d2a6ca",{token:block.token})
      
   
      res.json({ msg: "logout" });
    } catch (error) {
      res.status(404).json({ error: error });
    }
  } else {
    res.status(404).json({ error: "enter token" });
  }
});
userrrouter.get("/", auth, async(req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const user = await User.find({});
  
      res.json({ user:user});
    } catch (error) {
      res.status(404).json({ error: error });
    }
  } else {
    res.status(404).json({ error: "enter token" });
  }
});

module.exports = userrrouter;
