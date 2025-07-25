import ProjectCard from './ProjectCard';


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

                <div className="flex items-center justify-center">
                    View More <span 
                        className="material-symbols-rounded"
                        aria-hidden="true"
                    >
                        arrow_outward
                    </span>
                </div>
                </div>
            </div>
        </section>
    )
}

export default AllProject;