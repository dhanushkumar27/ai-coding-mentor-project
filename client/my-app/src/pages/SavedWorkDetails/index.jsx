import {useParams} from 'react-router-dom'


import PageLayout  from '../../layouts/PageLayout'
import SavedWorkDetailsBody from '../../components/SavedWorkDetailsComponents/SavedWorkDetailsBody'
import Navbar from '../../components/common/Navbar'

import './index.css'

const SavedWorkDetails = () => {
  const {id} = useParams()
  const savedResponseList = JSON.parse(localStorage.getItem("aiCodingMentor_saved_response"))

  const currentResponse = savedResponseList.find(eachItem => eachItem.id === id);
  

  return(
    <PageLayout
      className='SavedWorkDetails-container' 
      style={{
       flex:"1",
        display:"flex",
        minHeight: "0",
        }}
        header={<Navbar/>}
      >
        <SavedWorkDetailsBody currentResponse={currentResponse}/>
    </PageLayout>
  )
}

export default SavedWorkDetails