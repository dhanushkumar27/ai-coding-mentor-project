import PageLayout  from '../../layouts/PageLayout'

import Navbar from '../../components/common/Navbar'
import HomeBody from '../../components/homeComponents/HomeBody'
import Footer from '../../components/common/Footer'
import './index.css'

const Home = () => {
  return(

      <PageLayout 
          className="" style={{}}
          header={<Navbar />}
          footer={<Footer />}
      >
        <HomeBody/>
      </PageLayout>
      

  )
}

export default Home