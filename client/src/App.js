import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Item from "./components/Item";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/item" element={<Item/>}/>
      </Routes>
    </Router>
  );
}

export default App;
