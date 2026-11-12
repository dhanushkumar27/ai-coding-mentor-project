import { useState, useCallback, useMemo } from "react";

import CodeInputContext from "./CodeInputContext";
import EDITOR_TEMPLATES from "../../constants/editorTemplates";

const INITIAL_LANGUAGE = "java";

const CodeInputProvider = ({ children }) => {
  const [problemName, setProblemName] = useState("");

  const [programmingLanguage, setProgrammingLanguage] =
    useState(INITIAL_LANGUAGE);

  const [code, setCode] = useState(
    EDITOR_TEMPLATES[INITIAL_LANGUAGE]
  );

  const clearCodeInput = useCallback(() => {
    setProblemName("");
    setProgrammingLanguage(INITIAL_LANGUAGE);
    setCode(EDITOR_TEMPLATES[INITIAL_LANGUAGE]);
  }, []);

  const contextValue = useMemo(
    () => ({
      problemName,
      setProblemName,

      programmingLanguage,
      setProgrammingLanguage,

      code,
      setCode,

      clearCodeInput,
    }),
    [problemName, programmingLanguage, code, clearCodeInput]
  );



  return (
    <CodeInputContext.Provider value={contextValue}>
      {children}
    </CodeInputContext.Provider>
  );
};

export default CodeInputProvider;