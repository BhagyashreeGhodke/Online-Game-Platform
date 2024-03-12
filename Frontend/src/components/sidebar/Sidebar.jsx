import { useContext, useEffect, useRef } from "react";
import { ThemeContext, SidebarContext, LIGHT_THEME, LogoutBtn } from "../index";

import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";

import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import { Link, NavLink } from "react-router-dom";
import "./Sidebar.scss";

import { useSelector } from 'react-redux';



const Sidebar = () => {

  const authStatus = useSelector((state) => state.auth.status);
  console.log("authStatus: ", authStatus);
  const adminStatus =  useSelector((state) => state.admin.status)
  console.log("adminStatus: ", adminStatus);

  const { theme } = useContext(ThemeContext);
  
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">Online Game Platform</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
        <ul className="menu-list">
        <li className="menu-item">
              <Link to="/" className="menu-link active">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Home</span>
              </Link>
            </li> 

            { /* admin dashboard */ }
        { authStatus && adminStatus && (<li className="menu-item">
              <Link to="/dashboard" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li> )}

            { /* user dashboard */ }
            { authStatus && !adminStatus && (<li className="menu-item">
              <Link to="/user-dashboard" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li> )}

            { authStatus && ( <li className="menu-item">
              <Link to="/all-users" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Messages</span>
              </Link>
            </li> )}

            {/* Add "Sign In" and "Sign Up" options */}
            { !authStatus && <li className="menu-item">
              <Link to="/login" className="menu-link">
                <span className="menu-link-icon">
                <FaSignInAlt size={20} />
                </span>
                <span className="menu-link-text">Sign In</span>
              </Link>
            </li> }
            { !authStatus &&  <li className="menu-item">
              <Link to="/register" className="menu-link">
                <span className="menu-link-icon">
                <FaUserPlus size={20} />
                </span>
                <span className="menu-link-text">Sign Up</span>
              </Link>
            </li>}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
        { authStatus &&  <ul className="menu-list">
            <li className="menu-item" >
              <Link to="/profile" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Profile</span>
              </Link>
            </li>
            
           
            <li className="menu-item">
              <NavLink to="/logout" className="menu-link">
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text"><LogoutBtn /></span>
              </NavLink>
            </li>
          </ul> }
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
