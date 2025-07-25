import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfilio from './components/Portfolio';
import AllProject from './components/AllProjects';
import AllAchievements from './components/AllAchievements';
import Header from "./components/Header";
import './index.css';
// import NotFound from './pages/NotFound';

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Portfilio />} />
      <Route path="/projects" element={<AllProject />} />
      <Route path="/achievements" element={<AllAchievements />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </>
  );
};

export default App;
