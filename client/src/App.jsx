import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* pages */
import All from "./pages/All";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import './index.css';
/* components */
/* MaterialUI */

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
      <Route path="/home" element={<Home />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
}
