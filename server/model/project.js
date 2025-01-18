const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { 
        type: String, required: true },
    description: { 
        type: String
     },
    repoLink: { 
        type: String, 
        required: true 
    }, 
    framer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users", 
      required: true
    }, 
    status: { 
      type: String, 
      enum: ["pending" , "completed"], 
      default: "pending" 
    },
   
  } , {timestamps:true});
  
  const Project = mongoose.model("Project", projectSchema);
  module.exports = Project;
  