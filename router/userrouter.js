const express = require("express");
const { User } = require("../model/usermodel");
const bcrypt = require("bcrypt");
const userrrouter = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



require("dotenv").config();
userrrouter.post("/signup", (req, res) => {
  const { email, name,confirmPassword, password } = req.body;
  console.log(req.body)
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(404).send({ error: err.message });
      } else {
        const user = { email: email,confirmPassword, password: hash, name: name };
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


module.exports = userrrouter;
