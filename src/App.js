import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import AddVideo from "./pages/admin/AddVideo";
import AdminLogin from "./pages/admin/AdminLogin";
import AssignmentMarks from "./pages/admin/AssignmentMarks";
import Assignments from "./pages/admin/Assignments";
import Dashboard from "./pages/admin/Dashboard";
import Quizzes from "./pages/admin/Quizzes";
import Videos from "./pages/admin/Videos";
import UpdateVideo from "./pages/admin/UpdateVideo";

function App() {
    return (
        <div>
            <Nav />
            <Router>
                <Routes>
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/videos" element={<Videos />} />
                    <Route path="/admin/quizzes" element={<Quizzes />} />
                    <Route
                        path="/admin/assignments"
                        element={<Assignments />}
                    />
                    <Route
                        path="/admin/assignmentMark"
                        element={<AssignmentMarks />}
                    />
                    <Route path="/admin/addVideo" element={<AddVideo />} />
                    <Route path="/admin/video/update/:id" element={<UpdateVideo />} />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
