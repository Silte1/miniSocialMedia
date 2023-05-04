// const User = require("../db/users.js")
// const cloudinary = require("cloudinary").v2
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer")
// const bcrypt = require('bcrypt')
// //dotenv
// require('dotenv').config()

// // cloudinary
// const cloudName= process.env.CLOUD_NAME 
// const apiKey= process.env.API_KEY
// const apiSecret= process.env.API_SECRET
// cloudinary.config({
//     cloud_name: cloudName,
//     api_key: apiKey,
//     api_secret: apiSecret
//   });

//   //Cloudinary storage and Multer
// const pictures = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params:{
//         folder: "delete",
//         format: async (req, file)=>{
//         let format
//         switch (file.mimetype) {
//             case "image/jpeg":
//                 format = "jpg";
//                 break;
//             case "image/png":
//                 format= "png";
//                 break;
//             case "image/gif":
//                 format = "gif";
//                 break;
//             default:
//                 format= "jpg"
//                 break;
//         }
//         return format
//         }
//     }
// })

// // set up multer middleware for handling file uploads
// const upload = multer({storage: pictures})


// // NEW USER REGISTER ROUTE

// const registerFunction = async ( req, res)=>{
//       try {
//          // create hash for the user password
//          const salt = bcrypt.genSaltSync(11)
//          const hash = bcrypt.hashSync(req.body.password, salt)
        
//         //new user
//         const newUser =  new User({
//            name: req.body.name,
//            username: req.body.username,
//            password: hash,
//            profilePicture: ""
//            })

//         // upload profile picture
//         upload.single("profilePicture")
//           const pic = await cloudinary.uploader.upload(req.file.path, {
//            public_id: `profile_picture_${newUser._id}`,
//            folder: `avatar/${newUser._id}`
 
//           })

        
//         // update the new user date adding the profile picture
//           newUser.profilePicture = pic.secure_url
  

//          await newUser.save()
//          res.json(newUser)
//         //  process.exit()
//      } catch (error) {
//          console.log(error);
//      }    
// }



// // USER LOGIN ROUTE

// const loginFunction =  async (req, res) => {
//     // destructure req body 
//     const {username, password} = req.body
//     // check if the user exist in the database
//     const foundUser = await User.findOne({'username': username})
//     //if not send 404 (not found)
//            if(foundUser === null){
//             res.status(404).json("User not found")
//                   }
//     // if yes compare the password to the registered one
//         else{
//             const result = bcrypt.compareSync(password, foundUser.password)
//            // If the password is wrong respond with an unauthorized status code (401)
//                 if (result === false) {
//                   res.status(401).json("wrong password")
//                 }else{
//                     // if the password is correct respond with successful  status code (200)
//                     res.status(200).json(foundUser)
//                 }    } }

// module.exports = (registerFunction, loginFunction)