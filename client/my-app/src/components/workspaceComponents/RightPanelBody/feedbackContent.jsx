import { useContext } from "react";


import UniversalSmartRenderer from '../../common/SuccessResponse/UniversalSmartRenderer'
import Loader from '../../common/Loader'
import FailureState from '../../common/FailureResponse'
import FeedbackInitialState from '../../common/InitialState/FeedbackInitialState'


import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"

const title="Analyzing your code"
const subtitle="Identifying issues and preparing feedback."

const feebackTitle="Ready to review your code?"
const feedbackDescription="Analyze your solution to receive debugging feedback, code-quality insights, and suggestions to improve your coding approach."

const FeedbackContent = () =>{
    const {feedbackStatus, feedback} = useContext(AIResponseContext)
 
    const feedbackState = () =>{
        switch(feedbackStatus){
            case 'Success':
                return <UniversalSmartRenderer data={feedback}/>
            case 'Failure':
                return <FailureState />
            case 'InProgress':
                return <Loader title={title} subtitle={subtitle} />
            default:
                return <FeedbackInitialState title={feebackTitle} subtitle={feedbackDescription}/>
        }
}

    return feedbackState()
}

export default FeedbackContent