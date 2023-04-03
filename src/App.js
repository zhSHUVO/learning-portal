import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/admin" element={<AdminLogin />} />
                </Routes>
            </Router>
            <Toaster />
        </div>
    );
}

export default App;
