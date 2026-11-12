import PageLayout  from '../../layouts/PageLayout'


import Navbar from '../../components/common/Navbar'
import MyLibraryBody from '../../components/myLibraryComponents/MyLibraryBody'

import "./index.css"

const MyLibrary = () => {
  return(
    <PageLayout 
    className='' 
    style={{
      
      }}
      header={<Navbar />}
      >
        <MyLibraryBody/>
    </PageLayout>
  )
}

export default MyLibrary