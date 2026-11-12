import CodeEditor from '../../common/CodeEditor'

import { useContext } from "react";
import CodeInputContext from "../../../contexts/CodeInputContext/CodeInputContext"


const LeftPanelBody = () =>{
    const {code, setCode, programmingLanguage} = useContext(CodeInputContext)
    return(
        <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
            
            <CodeEditor code = {code}
             programmingLanguage={programmingLanguage}
             onCodeChange={setCode}
             readOnly={false}
              />
             
        </div>
    )
}

export default LeftPanelBody