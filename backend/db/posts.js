const express =  require("express");
const mongoose =  require("mongoose");
const User = require("./users")

// Define user schema und model
const postSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    postPicture: String,
     author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     }

})

// userModel

const Post = mongoose.model("post", postSchema)

module.exports = Post