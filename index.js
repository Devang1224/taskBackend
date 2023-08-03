const express = require('express');
const connectDb = require('./Db/Dbconfig');
const cors = require('cors')
const taskRoute = require("./routes/task")
const userRoute = require("./routes/user")
require('dotenv').config();

const app = express();
app.use(cors({
    origin: "http://localhost:3001"
 }));

app.use(express.json());

connectDb()


app.use("/",taskRoute)
app.use('/auth',userRoute)


app.listen(process.env.PORT || 6010,()=>{
    console.log(`server running on ${process.env.PORT}`);
})



