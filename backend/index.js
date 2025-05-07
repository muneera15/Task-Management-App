const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { authMiddleware } = require("./middleware");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/projects",authMiddleware, projectRoutes);
app.use("/api/projects/:projectId",authMiddleware,taskRoutes);

const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to Database");
    app.listen(port,()=>{
        console.log(`server listening on port ${port}`);
    })
})
.catch((err)=>{
    console.error(err);
})