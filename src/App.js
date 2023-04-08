import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import AddAssignment from "./pages/admin/AddAssignment";
import AddVideo from "./pages/admin/AddVideo";
import AdminLogin from "./pages/admin/AdminLogin";
import AssignmentMarks from "./pages/admin/AssignmentMarks";
import Assignments from "./pages/admin/Assignments";
import Dashboard from "./pages/admin/Dashboard";
import Quizzes from "./pages/admin/Quizzes";
import UpdateAssignment from "./pages/admin/UpdateAssignment";
import UpdateQuiz from "./pages/admin/UpdateQuiz";
import UpdateVideo from "./pages/admin/UpdateVideo";
import Videos from "./pages/admin/Videos";
import CoursePlayer from "./pages/student/CoursePlayer";
import Quiz from "./pages/student/Quiz";
import StudentLogin from "./pages/student/StudentLogin";
import StudentReg from "./pages/student/StudentReg";

function App() {
    return (
        <div>
            <Nav />
            <Router>
                <Routes>
                    {/* admin */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />

                    <Route path="/admin/videos" element={<Videos />} />
                    <Route path="/admin/addVideo" element={<AddVideo />} />
                    <Route
                        path="/admin/video/update/:id"
                        element={<UpdateVideo />}
                    />

                    <Route path="/admin/quizzes" element={<Quizzes />} />
                    <Route
                        path="/admin/quiz/update/:id"
                        element={<UpdateQuiz />}
                    />

                    <Route
                        path="/admin/assignments"
                        element={<Assignments />}
                    />
                    <Route
                        path="/admin/addAssignment"
                        element={<AddAssignment />}
                    />
                    <Route
                        path="/admin/assignment/update/:id"
                        element={<UpdateAssignment />}
                    />

                    <Route
                        path="/admin/assignmentMark"
                        element={<AssignmentMarks />}
                    />

                    {/* student */}
                    <Route path="/" element={<StudentLogin />} />
                    <Route path="/registration" element={<StudentReg />} />
                    <Route
                        path="/courseplayer/:videoId"
                        element={<CoursePlayer />}
                    />
                    <Route
                        path="/courseplayer/:videoId/quiz"
                        element={<Quiz />}
                    />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
