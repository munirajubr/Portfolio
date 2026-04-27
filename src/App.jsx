import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import MyWork from './pages/MyWork'
// import Services from './pages/Services'
import Contact from './pages/Contact'
import CaseStudy from './pages/CaseStudy'
import Achievements from './pages/Achievements'
import SurveyList from './survey/SurveyList'
// Removed hardcoded casestudy imports
import StudentGPT from './pages/casestudy/StudentGPT'
import AgriVision from './pages/casestudy/AgriVision'
import ContainerizedChronicles from './pages/casestudy/ContainerizedChronicles'
import ProjectCollab from './pages/casestudy/ProjectCollab'
import TripWeaver from './pages/casestudy/TripWeaver'
import WhatsappPainpoints from './pages/casestudy/WhatsappPainpoints'
// import Main from './pages/main'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/main" element={<Main />} /> */}
        <Route path="/about" element={<AboutMe />} />
        <Route path="/work" element={<MyWork />} />
        {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/casestudy/student-gpt" element={<StudentGPT />} />
        <Route path="/casestudy/agrivision" element={<AgriVision />} />
        <Route path="/casestudy/containerized-chronicles" element={<ContainerizedChronicles />} />
        <Route path="/casestudy/project-collab" element={<ProjectCollab />} />
        <Route path="/casestudy/tripweaver" element={<TripWeaver />} />
        <Route path="/casestudy/whatsapp-channel-update" element={<WhatsappPainpoints />} />
        <Route path="/user-survey" element={<SurveyList />} />
      </Routes>
    </>
  )
}
