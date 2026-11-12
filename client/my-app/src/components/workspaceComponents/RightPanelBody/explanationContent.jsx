import { useContext } from "react";


import UniversalSmartRenderer from '../../common/SuccessResponse/UniversalSmartRenderer'
import Loader from '../../common/Loader'
import FailureState from '../../common/FailureResponse'
import FeedbackInitialState from '../../common/InitialState/FeedbackInitialState'


import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"

const title="Analyzing your code"
const subtitle="Identifying issues and preparing explanation."

const explanationTitle="Ready to understand the problem?"
const explanationDescription="Explore the problem logic, important concepts, and step-by-step explanations to strengthen your understanding."


const ExplanationContent = () =>{
    const {explanationStatus, explanation} = useContext(AIResponseContext)
 
    const feedbackState = () =>{
        switch(explanationStatus){
            case 'Success':
                return <UniversalSmartRenderer data={explanation}/>
            case 'Failure':
                return <FailureState />
            case 'InProgress':
                return <Loader title={title} subtitle={subtitle} />
            default:
                return <FeedbackInitialState title={explanationTitle} subtitle={explanationDescription}/>
        }
}

    return feedbackState()
}

export default ExplanationContent