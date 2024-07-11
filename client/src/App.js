import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

/* pages */
import Home from './pages/Home';
import Archive from './pages/Archive'
import Data from './pages/Data';
import Setting from './pages/Setting';
import Mypage from './pages/Mypage';
import Login from './pages/LoginPage';
import Logout from './pages/LogoutPage'
import SignupPage from './pages/SignupPage';
/* components */
import SelectedListItem from './components/HomeFolder';
import TopBar from './components/TopBar'
/* MaterialUI */
import { Grid } from '@material-ui/core';

function App() {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
          <Grid container>
            <Grid item xs={12} sm ={12} md={2} lg={2} xl={2}>
              <SelectedListItem />
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <AppRoutes />
            </Grid>
          </Grid>
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  return (
  <Routes>
    <Route path="/" element={<Navigate to="/auth/login" />} />
    <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    <Route path="/archive" element={<ProtectedRoute element={<Archive />} />} />
    <Route path="/data" element={<ProtectedRoute element={<Data />} />} />
    <Route path="/setting" element={<ProtectedRoute element={<Setting />} />} />
    <Route path="/auth/mypage" element={<ProtectedRoute element={<Mypage />} />} />
    <Route path='/auth/login' element={<Login />} />
    <Route path='/auth/logout' element={<Logout/>}></Route>
    <Route path='/auth/signup' element={<SignupPage />}></Route>
  </Routes>
  );
}

export default App;
