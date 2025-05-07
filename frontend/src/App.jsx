import React from "react";
import { Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Projects } from "./pages/Projects";
import { ProjectTasks } from "./pages/ProjectTasks";
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element ={<Signup />}/>
      <Route path="/projects" element={<Projects />}/>
      <Route path="/projects/:projectId" element={<ProjectTasks />}/>
    </Routes>
    </div>
  );
}

export default App
