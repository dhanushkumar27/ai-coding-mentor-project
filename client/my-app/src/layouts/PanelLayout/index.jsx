import { useContext } from "react";

import BackgroundThemeContext from "../../contexts/BackgroundTheme/BackgroundThemeContext";

import "./index.css";

const PanelLayout = ({
    header,
    children,
    footer,
    className = "",
    style
}) => {

    const {isDarkModeOn} = useContext(BackgroundThemeContext)
    const backgroundColorStylingHeader = isDarkModeOn ? "backgroundThemeDark-header":"backgroundThemeLight-header"
    const backgroundColorStylingPanelLayout = isDarkModeOn ? "backgroundThemeDark-panel-layout":"backgroundThemeLight-panel-layout"
    const backgroundColorStylingFooter = isDarkModeOn ? "backgroundThemeDark-footer":"backgroundThemeLight-footer"

    return (
        <section
            className={`panel-layout ${className} ${backgroundColorStylingPanelLayout}`}
            style={style}
        >
            {header && (
                <div className={`panel-header ${backgroundColorStylingHeader}`} >
                    {header}
                </div>
            )}

            <div className={`panel-body`}>
                {children}
            </div>

            {footer && (
                <div className={`panel-footer ${backgroundColorStylingFooter}`}>
                    {footer}
                </div>
            )}
        </section>
    );
};

export default PanelLayout;