import PageLayout  from '../../layouts/PageLayout'
import Navbar from '../../components/common/Navbar'

import WorkspaceBody from '../../components/workspaceComponents/WorkspaceBody'
import './index.css'

const Workspace = () => {
  return(
    <PageLayout 
        className='workspace-container' 
        style={{
        flex:"1",
        display:"flex",
        minHeight: "0",
      }}
        header={<Navbar />}
        
      >
        <WorkspaceBody/>
    </PageLayout>
    
  )
}

export default Workspace

