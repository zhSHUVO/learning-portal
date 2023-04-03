import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";

function App() {
    return (
        <div>
            <Nav />
            <Router>
                <Routes>
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
