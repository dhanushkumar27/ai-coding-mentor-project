import { useContext } from "react";


import UniversalSmartRenderer from '../../common/SuccessResponse/UniversalSmartRenderer'
import Loader from '../../common/Loader'
import FailureState from '../../common/FailureResponse'
import FeedbackInitialState from '../../common/InitialState/FeedbackInitialState'


import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"

const title="Analyzing your code"
const subtitle="Identifying issues and preparing solution."

const solutionTitle="Ready to explore the solution?"
const solutionDescription="Discover efficient approaches, understand the algorithm, and explore optimized solutions with detailed code explanations."

const SolutionContent = () =>{
    const {solutionStatus, solution} = useContext(AIResponseContext)
 
    const feedbackState = () =>{
        switch(solutionStatus){
            case 'Success':
                return <UniversalSmartRenderer data={solution}/>
            case 'Failure':
                return <FailureState />
            case 'InProgress':
                return <Loader title={title} subtitle={subtitle} />
            default:
                return <FeedbackInitialState title={solutionTitle} subtitle={solutionDescription}/>
        }
}

    return feedbackState()
}

export default SolutionContent