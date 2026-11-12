
import { useState, useEffect, useCallback, useMemo } from "react";

import BackgroundThemeContext from "./BackgroundThemeContext";

const BackgroundThemeProvider = ({ children }) => {

    const [isDarkModeOn, setIsDarkModeOn] = useState(() => {
        const savedTheme = localStorage.getItem("background_theme_key");
        return savedTheme === "dark";
    });

    useEffect(() => {
        const theme = isDarkModeOn ? "dark" : "light";

        localStorage.setItem("background_theme_key", theme);
    }, [isDarkModeOn]);

    const toggleBackgroundTheme = useCallback(() => {
        setIsDarkModeOn((prev) => !prev);
    }, []);

    const contextValue = useMemo(
        () => ({
            isDarkModeOn,
            toggleBackgroundTheme
        }),
        [isDarkModeOn, toggleBackgroundTheme]
    );

    return (
        <BackgroundThemeContext.Provider value={contextValue}>
            {children}
        </BackgroundThemeContext.Provider>
    );
};

export default BackgroundThemeProvider;
