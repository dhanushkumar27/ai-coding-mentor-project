
import EDITOR_TEMPLATES from '../constants/editorTemplates'

const normalizeCode = (code) => {
    return code.replace(/\s+/g, "").trim();
};

const validateCodeInput = ({code, programmingLanguage}) =>{

    const templateCode = normalizeCode(
        EDITOR_TEMPLATES[programmingLanguage]
    );

    

    if (code.trim() === EDITOR_TEMPLATES[programmingLanguage]) {
        return true;
    }

    const userCode = normalizeCode(code);

    if (userCode === templateCode) {
        return true
    }

    return false;

}


export default validateCodeInput