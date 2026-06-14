import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Feedback from "./pages/Feedback";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;