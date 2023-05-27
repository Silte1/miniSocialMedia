const Post = require("../../db/posts")
const User = require("../../db/users")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer")
const jwt = require("jsonwebtoken")
const {authenticate, refreshToken} = require("../../auth")
const router = require("express").Router();
const cookieParser = require('cookie-parser')

// cookie parser

router.use(cookieParser())

//Cloudinary storage and Multer


//dotenv
require('dotenv').config()
// cloudinary
const cloudName= process.env.CLOUD_NAME 
const apiKey= process.env.API_KEY
const apiSecret= process.env.API_SECRET
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });

const postsFiles = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "delete",
        format: async (req, file)=>{
        let format
        switch (file.mimetype) {
            case "image/jpeg":
                format = "jpg";
                break;
            case "image/png":
                format= "png";
                break;
            case "image/gif":
                format = "gif";
                break;
            default:
                format= "jpg"
                break;
        }
        return format
        }
    }
})

// set up multer middleware for handling file uploads
const upload = multer({storage: postsFiles})


// All Post

router.route("/post").get(async(req, res)=>{
  console.log(req.cookies);
  // const access = await req.cookies.accessCookie

  // if(!access){
  //   res.sendStatus(401)
  //   process.exit()
  // }
  try {
  //   const decodedUserToken = jwt.decode(access)
  //   console.log("decoded:", decodedUserToken);
    
  //   const userWhoPosted = await User.findOne({"_id": decodedUserToken.userID})
  //   if(userWhoPosted){
    const allPost = await Post.find()
    // const postToReturn = allPost.map(post =>{
    //   post.author
    // })
    res.json(allPost)
    // res.send(allPost)}
  } catch (error) {
    console.log(error);
  }
}).post(upload.single("postPicture"), async (req, res)=>{
 
  const access = await req.cookies.accessCookie

  if(!access){
    res.sendStatus(401)
    // process.exit()
  }
  try {
    const decodedUserToken = jwt.decode(access)
console.log("decoded:", decodedUserToken);

  const userWhoPosted = await User.findOne({"_id": decodedUserToken.userID})
  const newPost = new Post({
postId: decodedUserToken.username,
title: req.body.title,
content: req.body.content,
author: userWhoPosted
  })
// console.log("userWhoPosted", userWhoPosted);


  // upload profile picture
  const pic = await cloudinary.uploader.upload(req.file.path, {
    public_id: `post_picture_${userWhoPosted._id}`,
    folder: `posts/${userWhoPosted._id}`

   })

 
 // update the new user date adding the profile picture
   newPost.postPicture = pic.secure_url

   await newPost.save()


  res.status(200).json({decodedUserToken, newPost})
  } catch (error) {
    console.log(error);
  }

})


// Posts from one user

router.route("/post/me").get(async(req, res)=>{
  // console.log(req.cookies);
  const access = req.cookies.accessCookie
   if(!access){
     res.sendStatus(401)
    //  process.exit()
   }
  try {
     const decodedUserToken = jwt.decode(access)
    //  console.log("decoded:", decodedUserToken);
    
     const userWhoPosted = await User.findOne({"_id": decodedUserToken.userID})
     if(userWhoPosted){
    // const myPost = await Post.find({"postId": userWhoPosted.username})
    
    // res.json(myPost)
    Post.find()
  .populate({
    path: 'author',
    match: { name: `${userWhoPosted.name}` }
  })
  .exec(function (err, posts){
    if (err) {
      console.error(err);
    } else {
      console.log(posts);
    }
  });
  } 
}catch (error) {
  console.log(error);
}})

module.exports = router
