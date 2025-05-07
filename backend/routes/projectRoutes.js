const express = require("express");
const Project = require("../models/project");
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
module.exports = router;