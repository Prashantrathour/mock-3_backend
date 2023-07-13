const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

  email:String,
  password:String,
  confirmPassword:String
});

const employeeSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:Number
},{versionKey:false})
const User = mongoose.model('user', userSchema);
const employee=mongoose.model('employee', employeeSchema);

module.exports = {User,employee};
