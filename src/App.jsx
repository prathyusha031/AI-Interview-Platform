import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Feedback from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";
import ResumeInterview from "./pages/ResumeInterview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Base from "./pages/Base";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route
              path="/home"
              element={
              <ProtectedRoute>
              <Home />
              </ProtectedRoute>
            }
        />

        <Route
              path="/dashboard"
              element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
            }
        />

        <Route
              path="/interview"
              element={
              <ProtectedRoute>
              <Interview />
              </ProtectedRoute>
            }
        />

        <Route
              path="/resume-interview"
              element={
             <ProtectedRoute>
             <ResumeInterview />
             </ProtectedRoute>
            }
        />
        
        <Route path="/feedback" element={<Feedback />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;