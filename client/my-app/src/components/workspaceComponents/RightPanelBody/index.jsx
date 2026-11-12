
import { useContext } from "react";

import FeedbackContent from './feedbackContent'
import ExplanationContent from './explanationContent'
import SolutionContent from './solutionContent'

import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"


import "./index.css"

const RightPanelBody = () =>{
    const {selectedResponseTab} = useContext(AIResponseContext)

    const rightPanelBodyResponse = () =>{
      switch(selectedResponseTab){
        case "Feedback":
          return <FeedbackContent/>
        case "Explanation":
          return <ExplanationContent/>
        case "Solution":
          return <SolutionContent/>
      }
    }

    return(
        <>
          {rightPanelBodyResponse()}
        </>
    )
}

export default RightPanelBody


