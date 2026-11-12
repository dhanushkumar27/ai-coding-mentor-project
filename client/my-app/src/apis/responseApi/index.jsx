
import getFeedback from '../../services/feedback.api'
import getExplanataion from '../../services/explanation.api'
import getSolution from '../../services/solution.api'

import validateCodeInput from "../../utils/validateCodeInput"


const responseApi = (props) =>{

    const {problemName, code, programmingLanguage,
            selectedResponseTab,
            setFeedbackStatus, setExplanationStatus, setSolutionStatus,
            setFeedback, setExplanation, setSolution,
            apiKeyValue} = props
        
    if(validateCodeInput({code, programmingLanguage})){
        return alert ("Please write something meaningful to get response.")
    }

    const onClickGetFeedback = async () => {
        console.log("Feedback button called")
        console.log(import.meta.env.VITE_API_URL)
        setFeedbackStatus('InProgress')
        try {

            const feedbackResponseData = await getFeedback({
                problemName,
                programmingLanguage,
                code,
                apiKeyValue
            });
        setFeedback(feedbackResponseData);
        setFeedbackStatus('Success')

        } catch (error) {
        setFeedbackStatus('Failure')
            console.error(
                "Feedback API error:",
                error
            );
        }
    };

    const onClickGetExplanation = async () =>{
        setExplanationStatus('InProgress')
        try {

            const explanationResponseData = await getExplanataion({
                problemName,
                programmingLanguage,
                code,
                apiKeyValue
            });
        setExplanation(explanationResponseData);
        setExplanationStatus('Success')

        } catch (error) {
        setExplanationStatus('Failure')
            console.error(
                "Feedback API error:",
                error
            );
        }
    }

    const onClickGetSolution = async () =>{
        setSolutionStatus('InProgress')
        try {

            const solutionResponseData = await getSolution({
                problemName,
                programmingLanguage,
                code,
                apiKeyValue
            });
        setSolution(solutionResponseData);
        setSolutionStatus('Success')

        } catch (error) {
        setSolutionStatus('Failure')
            console.error(
                "Feedback API error:",
                error
            );
        }
    }


    
    switch(selectedResponseTab){
            case 'Feedback':
                onClickGetFeedback();
                break;
            case 'Explanation':
                onClickGetExplanation();
                break;
            case 'Solution':
                onClickGetSolution();
                break;
            default:
                return null;
        }
   
}

export default responseApi