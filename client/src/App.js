import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
/* pages */
import Home from "./pages/Home";
import Archive from "./pages/Archive"
import Data from "./pages/Data";
import Setting from "./pages/Setting";
import Mypage from "./pages/Mypage";
import Login from "./pages/LoginPage";
import Logout from "./pages/LogoutPage"
import SignupPage from "./pages/SignupPage";
/* components */
import SelectedListItem from "./components/HomeFolder";
import TopBar from "./components/TopBar"
/* MaterialUI */
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Router>
      <TopBar />
      <Grid container>
        <Grid xs={10}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/data" element={<Data/>}/>
            <Route path="/setting" element={<Setting/>} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout/>}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Routes>
        </Grid>
        <Grid xs={2}>
          <SelectedListItem />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
