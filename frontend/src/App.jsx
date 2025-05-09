import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Projects } from "./pages/Projects";
import { ProjectTasks } from "./pages/ProjectTasks";
import { ProtectedRoute } from "./components/ProtectedRoute";
console.log(Navigate);
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element ={<Signup />}/>
      <Route path="/projects" element = { <ProtectedRoute ><Projects /></ProtectedRoute >} />
      <Route path="/projects/:projectId" element={<ProtectedRoute ><ProjectTasks /></ProtectedRoute >}/>
    </Routes>
    </div>
  );
}

export default App
