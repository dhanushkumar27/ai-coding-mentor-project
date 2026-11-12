
import { useContext } from "react";
import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext'

import './index.css'

const ResponseButtons = () =>{
    const {selectedResponseTab, setSelectedResponseTab} = useContext(AIResponseContext)
    const {isDarkModeOn} = useContext(BackgroundThemeContext)
    
    return(
        <>
            <button
                className={`response-tab-btn ${isDarkModeOn ? "dark" : "light"} ${selectedResponseTab === "Feedback" ? "active" : ""}`}
                onClick={() => setSelectedResponseTab("Feedback")}
            >
                Feedback
            </button>

            <button
                className={`response-tab-btn ${isDarkModeOn ? "dark" : "light"} ${selectedResponseTab === "Explanation" ? "active" : ""}`}
                onClick={() => setSelectedResponseTab("Explanation")}
            >
                Explanation
            </button>

            <button
                className={`response-tab-btn ${isDarkModeOn ? "dark" : "light"} ${selectedResponseTab === "Solution" ? "active" : ""}`}
                onClick={() => setSelectedResponseTab("Solution")}
            >
                Solution
            </button>
        </>
        
    )
}

export default ResponseButtons