import { useContext } from "react";

import InputField from "../../common/InputField"
import SelectField from "../../common/SelectField"

import EDITOR_TEMPLATES from "../../../constants/editorTemplates";

import CodeInputContext from "../../../contexts/CodeInputContext/CodeInputContext";

const programmingLanguages = [
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
];

const LeftPanelHeader = () => {
  const {problemName,setProblemName,setCode, programmingLanguage, setProgrammingLanguage} = useContext(CodeInputContext)
  
  const onChangeProgrammingLanguage = (e) =>{
    setProgrammingLanguage(e.target.value)
    setCode(EDITOR_TEMPLATES[e.target.value])
  }

  

  return (

    <div className="left-panel-header" style={{display:"flex", justifyContent:"space-between", alignContent:"center", padding:"5px"}}>

      <InputField
        id="problem-name"
        label="Problem Name"
        value={problemName}
        onChange={(e) => setProblemName(e.target.value)}
        placeholder="Enter problem name"
      />

      <SelectField
        id="programming-language"
        label="Language"
        value={programmingLanguage}
        onChange={(e) => onChangeProgrammingLanguage(e)}
        options={programmingLanguages}
      />

    </div>
  );
};

export default LeftPanelHeader;
/*{
  problemName,
  setProblemName,
  programmingLanguage,
  setProgrammingLanguage,
  readOnly = false,
} */