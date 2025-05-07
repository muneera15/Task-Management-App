const express = require("express");
const Task = require("../models/task");
const router = express.Router({ mergeParams: true });


router.get("/tasks", async (req, res) => {
  // const { project, status, priority } = req.query;
  // const filter = { user: req.userId };
  // if (project) filter.project = project;
  // if (status && status !== "All") filter.status = status;
  // if (priority && priority !== "All") filter.priority = priority;

  try {
    const tasks = await Task.find({ userId : req.userId, projectId : req.params.projectId});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ 
      msg: "Error fetching tasks", 
      error: err.message });
  }
})

router.post("/tasks/create",async(req,res)=>{
    const body = req.body;
    console.log(req.params)
    const newTask = await Task.create({...body, 
        userId: req.userId,
        projectId : req.params.projectId});
        console.log(req.params.projectId)
    if(newTask){
    res.json(newTask);
    }else{
        return res.status(411).json({
            message :"Failed to create task", error: err.message})
    }
})

router.put("/tasks/:tid",async(req,res)=>{
    const body =req.body;
    const updatedTask = await Task.findOneAndUpdate({ 
        _id: req.params.tid, 
        userId: req.userId}, 
        ...body, 
        { new: true });
    res.json(updatedTask);
})

router.patch("/tasks/:tid",async(req,res)=>{
    const updatedTask = await Task.findOneAndUpdate({
        _id:req.params.tid,
        userId : req.userId},
        {$set: req.body},
        {new: true}
    );
    res.json(updatedTask);
})
router.delete("/tasks/:tid", async(req,res)=>{
    await Task.findOneAndDelete({
        _id : req.params.tid,
        userId : req.userId
    });
    res.json({
        msg: "Task has been deleted"
    });
 })
 module.exports= router;