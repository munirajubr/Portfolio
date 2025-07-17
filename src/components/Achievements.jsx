import AchievementCard from "./achievementCard"; // Changed to uppercase

const achievements = [
  {
    imgSrc: '',
    title: 'Google UX Design',
    tags: ['UX Design', 'Google', 'Certificate'],
    achievementLink: '/#achievements'
  },
  {
    imgSrc: '',
    title: 'Google AI Essentials',
    tags: ['AI Essentials', 'Google', 'LLM'],
    achievementLink: '/#achievements'
  },
];

const Achievements = () => {
    return(
        <section id="achievements" className="section">
            <div className="container">
                <h2 className="mb-8 headline-2 reveal-up"> 
                    My Achievements
                </h2>

                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
                    {
                        achievements.map(({imgSrc, title, tags, achievementLink}, key)=>(
                            <AchievementCard // Changed to uppercase
                            key={key}
                            imgSrc={imgSrc}
                            title={title}
                            tags={tags}
                            achievementLink={achievementLink}
                            classes="reveal-up"/>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Achievements;