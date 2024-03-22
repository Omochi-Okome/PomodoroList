import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item" />
        <Route path="/archive" element={<Archive/>} />
      </Routes>
    </Router>
  );
}

export default App;
