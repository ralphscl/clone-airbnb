const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    contactNumber: {type:Number, unique: true},
    email: {type:String, unique:true},
    password: String
})

const userModel = model('User', UserSchema);

module.exports = userModel;