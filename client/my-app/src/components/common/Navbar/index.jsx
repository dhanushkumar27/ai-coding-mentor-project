import {
    FiHome,
    FiCode,
    FiBookOpen,
    FiSun,
    FiMoon,
} from "react-icons/fi";


import { NavLink } from "react-router-dom";

import { useContext } from "react";
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext'

import './index.css'

const navigationItems = [
    {
        path: "/",
        label: "Home",
        icon: FiHome,
    },
    {
        path: "/workspace",
        label: "Workspace",
        icon: FiCode,
    },
    {
        path: "/myLibrary",
        label: "Library",
        icon: FiBookOpen,
    },
    
];

const getNavClassName = ({ isActive }) =>
        isActive ? "nav-item active" : "nav-item";

const Navbar = () =>{
    const {isDarkModeOn,
            toggleBackgroundTheme} = useContext(BackgroundThemeContext)
    return(
        <div  style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"5px 20px",
            marginBottom:"5px",
            border: isDarkModeOn ? "1px solid white":"1px solid black"
            }}>

        <h3 className="footer-logo">
                        Codexa
                    </h3>
            <nav className="navigation-menu">
                    {navigationItems.map(({ path, label, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={getNavClassName}
                        >
                            <Icon />
                            <span>{label}</span>
                        </NavLink>
                    ))}
            </nav>

        {isDarkModeOn ? (
    <button className="theme-toggle-btn" onClick={toggleBackgroundTheme}>
        <FiSun />
    </button>
) : (
    <button className="theme-toggle-btn" onClick={toggleBackgroundTheme}>
        <FiMoon />
    </button>
)}
        
            
        </div>
    )
}

export default Navbar