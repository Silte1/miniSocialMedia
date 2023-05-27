const express =  require("express");
const mongoose =  require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

const userRoute = require("./routes/users/userRoute")
const postRoute = require("./routes/posts/postRoute")
const commentRoute = require("./routes/comments/commentRoute")
const cookieParser = require('cookie-parser')

// cookie parser


//configurations
//mongoose
async function main() {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://localhost:27017/socialEssenDB");
  }
  main().catch((err) => console.log(err));
// app
const app = express()
//dotenv
require('dotenv').config()



// body parser to make able to retrieve data from url encoded
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

// configure cors
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true

    }
))

app.use(express.json())

///user route
app.use("/", userRoute)

///post route
app.use("/", postRoute)

//comment route
app.use("/", commentRoute)
// app listen
const port = process.env.PORT

app.listen(port, ()=>{
    console.log("The server run on localhost:", port);
})