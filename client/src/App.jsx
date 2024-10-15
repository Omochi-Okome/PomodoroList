import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* pages */
import All from "./pages/All";
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
      <Route path="/" element={<All />} />
      <Route path="/dashboard/task" element={<Task />} />
      <Route path="/dashboard/archiveTask" element={<ArchiveTask />} />
    </Routes>
  );
}
