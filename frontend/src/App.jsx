import React from "react";
import { Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Projects } from "./pages/Projects";
import { ProjectTasks } from "./pages/ProjectTasks";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element ={<Signup />}/>
      <Route path="/projects" element = { <ProtectedRoute ><Projects /></ProtectedRoute >} />
      <Route path="/projects/:projectId" element={<ProtectedRoute ><ProjectTasks /></ProtectedRoute >}/>
    </Routes>
    </div>
  );
}

export default App
