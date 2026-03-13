import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import MyWork from './pages/MyWork'
import Services from './pages/Services'
import Contact from './pages/Contact'
import CaseStudy from './pages/CaseStudy'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutMe />} />
      <Route path="/work" element={<MyWork />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/case-study/:id" element={<CaseStudy />} />
    </Routes>
  )
}
