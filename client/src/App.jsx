import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
/* pages */
import Home from "./pages/Home";
import Task from "./pages/Task";
import ArchiveTask from "./pages/ArchiveTask";
import "./index.css";

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/home" />} />
      <Route path="/dashboard/home" element={<Home />} />
      <Route path="/dashboard/task" element={<Task />} />
      <Route path="/dashboard/archiveTask" element={<ArchiveTask />} />
    </Routes>
  );
}
