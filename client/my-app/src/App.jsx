
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import Workspace from './pages/Workspace'
import MyLibrary from './pages/MyLibrary'
import SavedWorkDetails from './pages/SavedWorkDetails'

import AIConfigProvider from "./contexts/AIConfigContext/AIConfigProvider";
import WorkspaceProviders from "./contexts/WorkspaceProviders";
import BackgroundThemeProvider from "./contexts/BackgroundTheme/BackgroundThemeProvider";

import './index.css'

const App = () => {
  return(
  <BackgroundThemeProvider>
    <AIConfigProvider>
      <WorkspaceProviders>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/workspace" element={<Workspace/>}/>
            <Route path="/myLibrary" element={<MyLibrary/>}/>
            <Route path="/savedWorkDetails/:id" element={<SavedWorkDetails/>}/>
          </Routes>
      </BrowserRouter>
      </WorkspaceProviders>
    </AIConfigProvider>
  </BackgroundThemeProvider>
      
   
  )
}

export default App