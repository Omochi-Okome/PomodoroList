import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
import SelectedListItem from './components/HomeFolder/HomeFolder';
import TopBar from './components/TopBar'
/* MaterialUI */
import { Grid } from '@material-ui/core';

const App = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthProvider>
      <Router>
        <TopBar user={user} />
        <Grid container>
          {user && (
            <>
              <Grid item md={2} lg={2} xl={2}>
                <SelectedListItem />
              </Grid>
            </>
          )}
          <Grid item xs={9} sm ={10} md={user ? 10 : 12} lg={user ? 10 : 12} xl={user ? 10 : 12}>
            <AppRoutes user={user} />
          </Grid>
        </Grid>           
      </Router>
    </AuthProvider>
  );
}

const AppRoutes = ({user}) => {
  return (
  <Routes>
    <Route path="/" element={<Navigate to="/auth/login" />} />
    <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
    <Route path="/archive" element={<ProtectedRoute element={<Archive />} />} />
    <Route path="/data" element={<ProtectedRoute element={<Data />} />} />
    <Route path="/setting" element={<ProtectedRoute element={<Setting />} />} />
    <Route path="/mypage" element={<ProtectedRoute element={<Mypage />} />} />
    <Route path='/auth/login' element={<Login />} />
    <Route path='/auth/logout' element={<Logout/> }></Route>
    <Route path='/auth/signup' element={<SignupPage />}></Route>
  </Routes>
  );
}

export default App;
