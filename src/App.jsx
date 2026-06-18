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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-interview" element={<ResumeInterview />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;