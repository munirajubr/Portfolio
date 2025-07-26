import ReviewCard from './ReviewCard';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(useGSAP, ScrollTrigger);


const reviews = [
  // {
  //   content: '',
  //   name: '',
  //   imgSrc: '',
  //   company: ''
  // }
];

const Review = () => {

  useGSAP(()=>{
    gsap.to('.scrub-slide', {
      scrollTrigger: {
        trigger: '.scrub-slide',
        start: '-200% 80%',
        end: '400% 80%',
        scrub: true
      },
      x: '-1000'
    }
    )
  })

    return (
        <section id="reviews" className="overflow-hidden section">
            <div className="container">
                <h2 className="mb-8 headline-2 reveal-up">
                    What our customers say
                </h2>
                <div className="flex items-stretch gap-3 w-fit scrub-slide">
                    {reviews.map(({content, name, imgSrc, company}, key) => (
                        <ReviewCard 
                            key={key}
                            name={name}
                            imgSrc={imgSrc}
                            company={company}
                            content={content}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Review;