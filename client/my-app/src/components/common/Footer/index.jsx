import { useContext } from "react";
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext'


import "./index.css";

const Footer = () => {

    const {isDarkModeOn,
            toggleBackgroundTheme} = useContext(BackgroundThemeContext)

    return (

        <footer className="footer" style={{
            display:"flex",
            justifyContent:"space-between",
            alignContent:"center",
            padding:"10px",
            border: isDarkModeOn ? "1px solid white":"1px solid black"}}>

                <div className="footer-left">

                    <h3 className="footer-logo">
                        Codexa
                    </h3>

                </div>

                <div className="footer-center">

                    <p className="footer-text">
                        Built with
                        <span className="heart"> ❤ </span>
                        for Students
                    </p>

                </div>

                <div className="footer-right">

                    <p className="footer-copy">
                        © 2026 Codexa D.
                    </p>

                </div>
          
        </footer>

    );
};

export default Footer;