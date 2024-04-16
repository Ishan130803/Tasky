import mongoose, { Schema } from "mongoose";
import { UserModel } from "./user";
const projectSchema = new Schema({
    name:String,
    id:String,
    dueDate:Date,
    tasks:[String],
    users:{
        type:mongoose.Schema.Types,
        ref:UserModel
    }
})

const ProjectModel = mongoose.model('project',projectSchema); 