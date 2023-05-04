const express =  require("express");
const mongoose =  require("mongoose");


// Define user schema und model
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        trim: true,
    },
    profilePicture: String

})

// userModel

const User = mongoose.model("user", userSchema)

module.exports = User