const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        maxLength : 50
    },
    description: String,
    status: { 
        type: String, 
        enum: ["Pending", "In Progress", "Completed"], 
        default: "Pending",
        required : true
    },
    priority: { 
        type: String, 
        enum: ["Low", "Medium", "High"], 
        default: "Low",
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project",
        required: true
    },
    dueDate: Date
  }, 
  { timestamps: true },{versionKey: false});

  const Task = mongoose.model("Task",taskSchema);

  module.exports= Task;