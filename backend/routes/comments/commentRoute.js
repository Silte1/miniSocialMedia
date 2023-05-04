const Comment = require("../../db/comments")
const jwt = require("jsonwebtoken")
const {authenticate, refreshToken} = require("../../auth")
const router = require("express").Router();
const cookieParser = require('cookie-parser')

// cookie parser

router.use(cookieParser())

//dotenv
require('dotenv').config()

router.route("/post/comment").post(async (req, res)=>{
    const access = await req.cookies.accessCookie

  if(!access){
    res.sendStatus(401)
    process.exit()
  }
  try {
    const decodedUserToken = jwt.decode(access)
    const newComment = await new Comment({
        commentId: decodedUserToken.username,
        comment: req.body.comment
    })
    newComment.save()
    res.send(newComment)
  } catch (error) {
    
  }
})

module.exports = router