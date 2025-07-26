import ProjectCard from './ProjectCard';
import { ButtonPrimary, ButtonOutline } from "./Button";

const works = [
  {
    imgSrc: '/images/Student GPT.jpg',
    title: 'Student GPT Mobile App UI Design',
    tags: ['Figma', 'UI Design', 'Mobile UI'],
    projectLink: 'https://www.behance.net/gallery/223935725/Student-GPT-Your-Smart-Academic-Assistant'
  },
  {
    imgSrc: '/images/ProjectCollab.jpg',
    title: 'Project Collab Mobile App UI Design',
    tags: ['Figma', 'UI Design', 'Mobile UI'],
    projectLink: 'https://www.behance.net/gallery/226979827/ProjectCollab-Connecting-Innovators'
  },
  {
    imgSrc: '/images/Trip_planner_app_UI.jpg',
    title: 'Trip Planner Mobile App UI Design',
    tags: ['Figma', 'UI Design', 'Mobile UI'],
    projectLink: ''
  },
  {
    imgSrc: '/images/Containerized_Chronicles.jpg',
    title: 'Containerized Chronicles A Authenticated Blogging Platform',
    tags: ['Django', 'Web App', 'Blog Site'],
    projectLink: ''
  },
];

const Work = () => {
    return(
        <section id="work" className="section">
            <div className="container">
                <h2 className="mb-8 headline-2 reveal-up"> 
                    My portfolio highlights
                </h2>

                <div className="grid gap-x-4 gap-y-5">
                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
                    {
                        works.map(({imgSrc, title, tags, projectLink}, key)=>(
                            <ProjectCard
                            key={key}
                            imgSrc={imgSrc}
                            title={title}
                            tags={tags}
                            projectLink={projectLink}
                            classes="reveal-up"
                            />
                        ))
                    }
                </div>

                <a href='/projects'>
                <div className="flex items-center justify-center reveal-up">
                    View More <span 
                        className="material-symbols-rounded"
                        aria-hidden="true"
                    >
                        arrow_outward
                    </span>
                </div>
                </a>
                </div>
            </div>
        </section>
    )
}

export default Work;