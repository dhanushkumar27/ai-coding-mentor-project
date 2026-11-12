import Editor from "@monaco-editor/react";

import { useContext } from "react";
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext'


import './index.css'

const CodeEditor = ({
    code = "",
    programmingLanguage = "java",
    onCodeChange,
    readOnly = false,
}) => {

   

    const handleEditorChange = (value) => {
        if (!readOnly) {
            onCodeChange?.(value ?? "");
        }
    };

    const {isDarkModeOn} = useContext(BackgroundThemeContext)

    return (
        <div className="code-editor-container">

            <Editor
                language={programmingLanguage}
                value={code}
                onChange={handleEditorChange}
                theme={isDarkModeOn ? "vs-dark" : "light"}
               
                options={{
                    automaticLayout: true,

                    readOnly: readOnly,

                    domReadOnly: readOnly,

                    fontSize: 14,

                    lineHeight: 22,

                    minimap: {
                        enabled: false,
                    },

                    wordWrap: "on",

                    scrollBeyondLastLine: false,

                    tabSize: 4,

                    insertSpaces: true,

                    padding: {
                        top: 5,
                        bottom: 5,
                    },

                    lineNumbers: "on",

                    folding: true,

                    glyphMargin: false,

                    scrollbar: {
                        vertical: "auto",
                        horizontal: "auto",
                    },
                }}
            />

        </div>
    );
};

export default CodeEditor;