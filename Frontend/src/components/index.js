import PageNotFound from './screens/error/PageNotFound'
import Dashboard from './screens/dashboard/Dashboard'

import BaseLayout from './layout/BaseLayout';

import {SidebarContext } from './context/SidebarContext'
import { ThemeContext} from './context/ThemeContext';

import {LIGHT_THEME, DARK_THEME } from './constants/themeConstants'

import Footer from './footer/Footer';

import Input from './container/Input'
import Button from './container/Button'
import Logo from './container/Logo';

import Login from './signInUp/Login';
import Signup from './signInUp/Signup';
import ForgotPassword from './forgotPassword/ForgotPassword';
import ResetPassword from './forgotPassword/ResetPassword';

import LogoutBtn from './logoutBtn/LogoutBtn'

import Home from './home/Home'
import Profile from './profile/Profile';

//user

import UserDashboardScreen from './user/screen/UserDashboardScreen';



export { default as Sidebar } from "./sidebar/Sidebar";
export { default as AreaCards } from "./dashboard/areaCards/AreaCards";
export { default as AreaCharts } from "./dashboard/areaCharts/AreaCharts";
export { default as AreaTable } from "./dashboard/areaTable/AreaTable";
export { default as AreaTop } from "./dashboard/areaTop/AreaTop";


export {
    PageNotFound,
    Dashboard,

    BaseLayout,

    SidebarContext,
    ThemeContext,

    LIGHT_THEME,
    DARK_THEME,

    Footer,

    Input,
    Button,
    Logo,

    Login,
    Signup,
    ForgotPassword,
    ResetPassword,

    LogoutBtn,

    Home,
    Profile,

    UserDashboardScreen

}