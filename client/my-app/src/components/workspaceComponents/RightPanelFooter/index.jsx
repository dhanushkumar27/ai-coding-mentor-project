import { useContext } from "react";
import BackgroundThemeContext from "../../../contexts/BackgroundTheme/BackgroundThemeContext"

import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"

const RightPanelFooter = () =>{
    const {clearAIResponse} = useContext(AIResponseContext)
    const {isDarkModeOn} = useContext(BackgroundThemeContext);
    return(
        <div className={`workspace-actions ${isDarkModeOn ? "dark" : "light"}`} style={{justifyContent:"flex-end"}}>
            <button className="reset-btn" onClick={()=>clearAIResponse()}>Reset</button>
        </div>
    )
}

export default RightPanelFooter