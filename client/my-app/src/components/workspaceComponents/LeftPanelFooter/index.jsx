import { useContext } from "react";
import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"
import CodeInputContext from "../../../contexts/CodeInputContext/CodeInputContext"
import AIConfigContext from "../../../contexts/AIConfigContext/AIConfigContext"
import BackgroundThemeContext from "../../../contexts/BackgroundTheme/BackgroundThemeContext"

import responseApi from "../../../apis/responseApi"

import './index.css'

         
            
         
            

const LeftPanelFooter = () =>{
    const {selectedResponseTab,
        setFeedbackStatus, setExplanationStatus, setSolutionStatus,
        setFeedback, setExplanation, setSolution} = useContext(AIResponseContext)
    const {clearCodeInput,problemName, code, programmingLanguage} = useContext(CodeInputContext)
    const {apiKeyValue} = useContext(AIConfigContext)
    const onClickGetButton = () =>{
        
        responseApi({problemName, code, programmingLanguage, 
            selectedResponseTab,
            setFeedbackStatus,setExplanationStatus, setSolutionStatus,
            setFeedback, setExplanation, setSolution,
            apiKeyValue})
    }

    const {isDarkModeOn} = useContext(BackgroundThemeContext);

    return(
        <div className={`workspace-actions ${isDarkModeOn ? "dark" : "light"}`}>
            <button className="reset-btn" onClick={()=>clearCodeInput()}>Reset</button>
            <button className="get-btn" onClick={onClickGetButton}>Get {selectedResponseTab}</button>
        </div>
    )
}

export default LeftPanelFooter