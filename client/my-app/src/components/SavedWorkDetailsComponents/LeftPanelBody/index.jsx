import CodeEditor from '../../common/CodeEditor'

const LeftPanelBody = ({currentResponse}) =>{
    
    const {code, programmingLanguage} = currentResponse
    return(
        <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
            
            <CodeEditor code = {code}
             programmingLanguage={programmingLanguage}
             
             readOnly={true}
              />
             
        </div>
    )
}

export default LeftPanelBody