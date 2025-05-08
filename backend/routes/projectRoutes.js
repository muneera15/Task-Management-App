const express = require("express");
const Project = require("../models/project")
const Task = require("../models/task")
const { authMiddleware } = require("../middleware")

const router = express.Router();

router.get("/", async(req,res)=>{
    const projects = await Project.find({
        userId : req.userId
    });
    res.json(projects);
})
router.get("/projectInfo/:pid", async(req,res)=>{
    const projects = await Project.find({
        userId : req.userId,
        _id : req.params.pid
    });
    res.json(projects);
})

router.post("/create",authMiddleware,async(req,res)=>{
    const body = req.body;
    const newProject = await Project.create({
        title : body.title,
        description : body.description,
        owner : body.owner,
        userId: req.userId
    });
    res.json(newProject);
})

router.patch("/:pid",async(req,res)=>{
    const updatedTask = await Project.findOneAndUpdate({
        _id:req.params.pid,
        userId : req.userId},
        {$set: req.body},
        {new: true}
    );
    res.json(updatedTask);
})
router.delete("/:pid", async(req,res)=>{
    await Promise.all([
        Project.findOneAndDelete({ _id: req.params.pid, userId: req.userId }),
        Task.deleteMany({ projectId: req.params.pid })
      ]);
    res.json({
        msg: "Task has been deleted"
    });
})
module.exports = router;