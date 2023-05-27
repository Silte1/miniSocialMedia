const express =  require("express");
const mongoose =  require("mongoose");
const User = require("./users")

// Define user schema und model
const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
})

// userModel

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment