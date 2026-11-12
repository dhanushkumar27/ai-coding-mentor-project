

import ResponseButtons from "../../common/ResponseButtons"
import SaveButton from "../../common/SaveButton"

const RightPanelHeader = () =>{
    return(
        <div style={{padding:"2px", display:"flex", justifyContent:"flex-end"}}>
            <ResponseButtons/>
            <SaveButton/>
        </div>
    )
}

export default RightPanelHeader