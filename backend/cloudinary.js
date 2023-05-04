const cloudinary = require("cloudinary").v2

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

  console.log(apiKey);

module.exports = cloudinary

