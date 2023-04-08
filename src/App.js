import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import StudentPrivateRoute from "./Components/StudentPrivateRoute";
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
import LeaderBoard from "./pages/student/LeaderBoard";
import Quiz from "./pages/student/Quiz";
import StudentLogin from "./pages/student/StudentLogin";
import StudentReg from "./pages/student/StudentReg";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    {/* admin */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <AdminPrivateRoute>
                                <Dashboard />
                            </AdminPrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/videos"
                        element={
                            <AdminPrivateRoute>
                                <Videos />
                            </AdminPrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/addVideo"
                        element={
                            <AdminPrivateRoute>
                                <AddVideo />
                            </AdminPrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/video/update/:id"
                        element={
                            <AdminPrivateRoute>
                                <UpdateVideo />
                            </AdminPrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/quizzes"
                        element={
                            <AdminPrivateRoute>
                                <Quizzes />
                            </AdminPrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/quiz/update/:id"
                        element={
                            <AdminPrivateRoute>
                                <UpdateQuiz />
                            </AdminPrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/assignments"
                        element={
                            <AdminPrivateRoute>
                                <Assignments />
                            </AdminPrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/addAssignment"
                        element={
                            <AdminPrivateRoute>
                                <AddAssignment />
                            </AdminPrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/assignment/update/:id"
                        element={
                            <AdminPrivateRoute>
                                <UpdateAssignment />
                            </AdminPrivateRoute>
                        }
                    />

                    <Route
                        path="/admin/assignmentMark"
                        element={
                            <AdminPrivateRoute>
                                <AssignmentMarks />
                            </AdminPrivateRoute>
                        }
                    />

                    {/* student */}
                    <Route
                        path="/"
                        element={
                            <StudentPrivateRoute>
                                <StudentLogin />
                            </StudentPrivateRoute>
                        }
                    />
                    <Route path="/registration" element={<StudentReg />} />
                    <Route
                        path="/courseplayer/:videoId"
                        element={
                            <StudentPrivateRoute>
                                <CoursePlayer />
                            </StudentPrivateRoute>
                        }
                    />
                    <Route
                        path="/courseplayer/:videoId/quiz"
                        element={
                            <StudentPrivateRoute>
                                <Quiz />
                            </StudentPrivateRoute>
                        }
                    />
                    <Route
                        path="/leaderboard"
                        element={
                            <StudentPrivateRoute>
                                <LeaderBoard />
                            </StudentPrivateRoute>
                        }
                    />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
