import ProjectCard from './ProjectCard';
import { ButtonNonOutline } from "./Button";


const works = [
  {
    imgSrc: '',
    title: 'Updating soon',
    tags: ['NULL', 'NULL'],
    projectLink: '/#work'
  },
  {
    imgSrc: '',
    title: 'Updating soon',
    tags: ['NULL', 'NULL'],
    projectLink: '/#work'
  },
];

const AllProject = () => {
    return(
        <section id="work" className="section">
            <div className="container">
                <ButtonNonOutline
                    href="/"
                    label=""
                    icon="arrow_back"
                />
                <h6 className="headline-2 reveal-up">  
                    Projects
                </h6>

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

                </div>
            </div>
        </section>
    )
}

export default AllProject;