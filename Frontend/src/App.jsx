import { useState, useContext, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { isAdmin } from "./store/adminSlice";

import "./App.scss";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";

import {BaseLayout, ThemeContext,
   DARK_THEME, LIGHT_THEME,
   Dashboard, PageNotFound,
   Home, Login, Signup,
   Profile,
   UserDashboardScreen,
   ForgotPassword,
   ResetPassword
  } from './components/index'
import AllUsers from "./components/messages/AllUsers";



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  const { theme, toggleTheme } = useContext(ThemeContext);
  

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/v1/users/current-user');
            const userData = response.data; // Assuming userData is a property of the response data
            // console.log('userData in App.jsx: ', userData.data);
            if (userData) {
                dispatch(login(userData)); // Dispatch the login action with userData
                const adminStatus = userData.data.adminStatus
                if(adminStatus){
                  dispatch(isAdmin())
                }
                console.log("adminStatus in app: ", adminStatus);
                
            } else {
                dispatch(logout());
            }
        } catch (error) {
            console.log('Error in app.jsx: ', error);
            // Handle error
        }
        setLoading(false);
    };

    fetchData();
}, []);

  const baseLayoutKey = useMemo(() => theme, [theme]);

  return !loading ? (
    <>
      <Router>
        <Routes>
          <Route key={baseLayoutKey} element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboardScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/all-users" element={<AllUsers />} />

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  ): (
    <>
    <Router>
      <Routes>
    <Route path="*" element={<PageNotFound />} />
    </Routes>
    <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
        </Router>
        </>
  )
}

export default App;