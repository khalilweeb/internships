const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  // field for all users
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
}, 
  role: { 
    type: String, 
    enum: ["student", "framer", "admin"], 
    required: true 
  },


  // Student  fields
  education: {
    university: { type: String },
    degree: { type: String },
    year: { type: Number },
  },
  skills: [{ type: String }],
  resumeLink: { type: String },
  project: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project", 
    required: false 
  }, 

  // framer fields
  expertise: [{ type: String }],
  assignedProjects: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project" 
  }], 
  comments: [{ 
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, 
    text: { type: String },
    createdAt: { type: Date, default: Date.now }
  }], 



}, {timestamps:true});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  this.password = await bcrypt.hash(this.password, 12);

});


const User = mongoose.model("User", userSchema);

module.exports = User;
