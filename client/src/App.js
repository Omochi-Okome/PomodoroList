import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Archive from "./pages/Archive"
import SelectedListItem from "./components/HomeFolder";
import TopBar from "./components/TopBar"
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Router>
      <TopBar />
      <Grid container>
        <Grid item xs={10}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
          </Routes>
        </Grid>
        <Grid item xs={2}>
          <SelectedListItem />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
