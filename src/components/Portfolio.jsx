import Hero from "./Hero";
import About from "./About";
import Skill from "./Skill";
import Work from "./Work";
// import Review from "./Review";
import Contact from "./Contact";
import Footer from "./Footer";
import Achievements from "./Achievements"

import { ReactLenis } from 'lenis/react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(useGSAP, ScrollTrigger);


const Portfilio = () => {

  useGSAP(()=>{
    const elements = gsap.utils.toArray('.reveal-up');

    elements.forEach((element)=>{
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: '-200 bottom',
          end:'bottom 80%',
          scrub: true
        },
        y: 0,
        opacity: 1,
        else: 'power2.out'
      })
    });
  });

  return (
    <ReactLenis root>
      <main>
        <Hero />
        <About/>
        <Skill/>
        <Work/>
        <Achievements/>
        {/* <Review/> */}
        <Contact/>
      </main>
      <Footer/>
    </ReactLenis>
  );
};
export default Portfilio;
