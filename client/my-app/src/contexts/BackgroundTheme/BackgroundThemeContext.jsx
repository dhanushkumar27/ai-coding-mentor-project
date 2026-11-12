import { createContext } from "react";

const BackgroundThemeContext = createContext({
    isDarkModeOn: false,
    toggleBackgroundTheme: () => {}
});

export default BackgroundThemeContext;