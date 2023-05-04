const User = require("../../db/users")

const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const router = require("express").Router();
const {authenticate, refreshToken} = require("../../auth")

const cookieParser = require('cookie-parser')

// cookie parser

router.use(cookieParser())

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


//Cloudinary storage and Multer
const pictures = new CloudinaryStorage({
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
const upload = multer({storage: pictures})


// registration of new users
router.route("/register").get((req, res)=>{
    res.send("REGISTER")
}).post(upload.single("profilePicture"), async (req, res)=>{
    try {
         // create hash for the user password
         const salt = bcrypt.genSaltSync(11)
         const hash = bcrypt.hashSync(req.body.password, salt)
        
        //new user
        const newUser =  new User({
           name: req.body.name,
           username: req.body.username,
           password: hash,
           profilePicture: ""
           })

        // upload profile picture
          const pic = await cloudinary.uploader.upload(req.file.path, {
           public_id: `profile_picture_${newUser._id}`,
           folder: `avatar/${newUser._id}`
 
          })

        
        // update the new user date adding the profile picture
          newUser.profilePicture = pic.secure_url
  

         await newUser.save()
         res.json(newUser)
        //  process.exit()
     } catch (error) {
         console.log(error);
     }    
})


// JWT token generator

const tokenGenerator = (credentials) =>{
    const accessToken = jwt.sign({
        username: credentials.username,
        userID: credentials.id
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h' 
    })
    const refreshToken = jwt.sign({
        username: credentials.username,
       }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1w'
    })
    return {accessToken, refreshToken}
    }


    // LOGIN 
router.post("/login",  async (req, res) => {
    // console.log(req.cookies);
    // destructure req body 
    const {username, password} = req.body
    // check if the user exist in the database
    const foundUser = await User.findOne({'username': username})
    
    //if not send 404 (not found)
           if(foundUser === null){
            res.status(404).json("User not found")
                  }
    // if yes compare the password to the registered one
        else{
            const result = await bcrypt.compare(password, foundUser.password)
           // If the password is wrong respond with an unauthorized status code (401)
                if (result === false) {
                  res.status(401).json("wrong password")
                }else{
                    // if the password is correct respond with successful  status code (200)
                    // and generate access and refresh token
                   
                     const {refreshToken, accessToken} = tokenGenerator(foundUser)
                    // console.log(refreshToken)
                    // console.log(accessToken);
            
                    // res.status(200).json(foundUser)
                    res.cookie("accessCookie", accessToken, {
                        withCredentials: true,
                        httpOnly: false,
                        //   secure: true, //set to true when deploy
                  //   sameSite: "none", //set to none when deploy
                    })
                    res.cookie("refreshCookie", refreshToken, {
                        withCredentials: true,
                        httpOnly: false,
                        //   secure: true, //set to true when deploy
                  //   sameSite: "none", //set to none when deploy
                    })
                    res.status(200).json({userId: foundUser._id})
                }    } })


// Logout
router.get("/logout", (req, res) => {
    
    const cookies = req.cookies
    if(!cookies?.accessCookie) return res.sendStatus(204) // NO CONTENT
    res.clearCookie('accessCookie', {httpOnly: false, withCredentials: true})
    res.json("Cookie cleared")
  });


// update data
router.route("/me").get( async (req, res) =>{
   
    const cookies = req.cookies.accessCookie
    // console.log(cookies);
    if(!cookies) return res.sendStatus(204) // NO CONTENT
    const decodedUser = jwt.decode(cookies)
    const userToFind = await User.findOne({"_id": decodedUser.userID})
    if(!userToFind) return res.sendStatus(404)
    // console.log("Decoded:", decodedUser);
    // console.log("userToFind:", userToFind);

    res.json(userToFind)
})


router.route("/me/update").patch(async (req, res)=>{
    console.log(req.body);
    // console.log(req.cookies);

    const {newName, newUsername, newAvatar, oldPassword, newPassword} = req.body
    const cookies = req.cookies.accessCookie
    if(!cookies) return res.sendStatus(204) // NO CONTENT
    const decodedUser = jwt.decode(cookies)
    const userToUpdate = await User.findOne({"_id": decodedUser.userID})
    if(!userToUpdate) return res.sendStatus(404)
    if(newName){
        // userToUpdate.name = newName 
        await User.updateOne({"_id": userToUpdate._id}, {$set: {"name": newName}})
    }
    if (newUsername) {
        // userToUpdate.username = newUsername 
        await User.updateOne({"_id": userToUpdate._id}, {$set: {"username": newUsername}})

    }
    if(newAvatar){
        // userToUpdate.profilePicture = newAvatar
        await User.updateOne({"_id": userToUpdate._id}, {$set: {"profilePicture": newAvatar}})

    }
    if(oldPassword && newPassword){
        const result = bcrypt.compareSync(oldPassword, userToUpdate.password)
        if(result === false)return res.sendStatus(401)
        if(result === true){
        const salt = bcrypt.genSaltSync(11)
         const newHash = bcrypt.hashSync(newPassword, salt)
        await User.updateOne({"_id": userToUpdate._id}, {$set: {"password": newHash}})
        }

    }
    const updatedUser = await User.findOne({"_id": decodedUser.userID})

    console.log("updatedUser:", updatedUser);
    res.json(updatedUser)
})

module.exports = router