import { useContext } from "react";

import BackgroundThemeContext from "../../contexts/BackgroundTheme/BackgroundThemeContext";


import './index.css'

const PageLayout = (
  { 
    header,
    children,
    footer,
    className = "",
    style}
) => {

  const {isDarkModeOn} = useContext(BackgroundThemeContext)
  const pageBackgroundStyling = isDarkModeOn ? "backgroundTheme-dark-page":"backgroundTheme-light-page"
  return (
    <div className={`page-layout ${className} ${pageBackgroundStyling}`} style={{}}>
      {header && (
                <div className="page-header">
                    {header}
                </div>
            )}

      <main className="page-body" style={style}>
        {children}
      </main>

      {footer && (
                <div className="page-footer" style={{border:"1px solid black"}}>
                    {footer}
                </div>
            )}
      
    </div>
  );
};

export default PageLayout;

