const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({

        title:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        isCompleted:{
            type:Boolean,
            default:false
        }
       },{timestamps:true}
)

const taskModel = new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tasks:[taskSchema]
    
},{timestamps:true}
)


module.exports  = new mongoose.model("tasks",taskModel);