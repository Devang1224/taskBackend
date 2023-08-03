const express = require('express');
const cors = require('cors')
const taskRoute = require("./routes/task")
const userRoute = require("./routes/user")
const mongoose  = require("mongoose")
require('dotenv').config();

const app = express();
app.use(cors());

app.use(express.json());




app.use("/",taskRoute)
app.use('/auth',userRoute)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongodb connected");
    app.listen(process.env.PORT || 6010,()=>{
        console.log(`server running on ${process.env.PORT}`);
    })
    
}).catch((err)=>{console.log(err)})




