const LeftPanelHeader = ({currentResponse}) =>{
    const {problemName, programmingLanguage} = currentResponse
    return(
        <div style={{display:"flex", justifyContent:"space-between", alignContent:"center", padding:"5px"}}>
            <p><span style={{fontWeight:"bold"}}>Problem Name:</span> {problemName}</p>
            <p><span style={{fontWeight:"bold"}}>Programming Language:</span> {programmingLanguage}</p>
        </div>
    )
}

export default LeftPanelHeader