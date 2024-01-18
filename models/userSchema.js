const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    cpassword:String
})
const USER = new mongoose.model("USERDATA", userSchema);
module.exports = USER;