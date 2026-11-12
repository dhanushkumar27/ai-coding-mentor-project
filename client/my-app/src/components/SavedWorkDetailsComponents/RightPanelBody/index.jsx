import { useContext } from "react";
import {useParams} from 'react-router-dom'

import AIResponseContext from "../../../contexts/AIResponseContext/AIResponseContext"
import UniversalSmartRenderer from '../../common/SuccessResponse/UniversalSmartRenderer'


const RightPanelBody = () =>{
    const {selectedResponseTab} = useContext(AIResponseContext)
    const existingResponses = JSON.parse(
        localStorage.getItem("aiCodingMentor_saved_response") || "[]"
      );
    const {id} = useParams()
 
    const savedWorkDetails = existingResponses.find(eachItem => eachItem.id === id)

    const {
            feedback,
            explanation,
            solution,
            } = savedWorkDetails

    const rightPanelBodyResponse = () =>{
      switch(selectedResponseTab){
        case "Feedback":
          return <UniversalSmartRenderer data={feedback}/>
        case "Explanation":
          return <UniversalSmartRenderer data={explanation}/>
        case "Solution":
          return <UniversalSmartRenderer data={solution}/>
        
      }
    }

    return(
        <>
            {rightPanelBodyResponse()}
        </>
    )
}

export default RightPanelBody