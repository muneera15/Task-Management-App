const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim : true,
        maxLength : 50
    }, 
    description: String,
    owner: String,
    userId: { 
        type: mongoose.Schema.ObjectId, 
        ref: "User",
        required: true
    }, 
  },{versionKey: false });
  
  const Project = mongoose.model("Project",projectSchema);

  module.exports = Project;