const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Password pattern: At least 1 capital letter, 1 number, 1 special character
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/;
        return passwordPattern.test(value);
      },
      message: 'Password must contain at least 1 capital letter, 1 number, and 1 special character.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema=mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    available:Boolean,
},{versionKey:false})
const User = mongoose.model('user', userSchema);
const products=mongoose.model('products', productSchema);

module.exports = {User,products};
