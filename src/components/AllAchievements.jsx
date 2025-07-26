import AchievementCard from "./achievementCard"; // Changed to uppercase
import { ButtonNonOutline } from "./Button";

const achievements = [
  {
    imgSrc: '/images/Google UX Design.jpg',
    title: 'Google UX Design',
    tags: ['UX Design', 'Google', 'Certificate'],
    achievementLink: 'https://drive.google.com/file/d/1_njfVoLGWv-INTz7zJz-1yau5btinX3q/view?usp=sharing'
  },
  {
    imgSrc: '/images/Google AI Essentials.jpg',
    title: 'Google AI Essentials',
    tags: ['AI Essentials', 'Google', 'LLM', 'Prompting'],
    achievementLink: 'https://drive.google.com/file/d/101xNpc0X22w4gxwXv-KALhnHfwJ7e2k2/view?usp=sharing'
  },
  {
    imgSrc: '/images/Microfsoft Foundations of UX and Design Thinking.jpg',
    title: 'Microfsoft Foundations of UX and Design Thinking',
    tags: ['Design Thinking', 'UX'],
    achievementLink: 'https://drive.google.com/file/d/1IVdPvVWwSjmjFLXbMQO4RXOzeWGNzqon/view?usp=sharing'
  },
];

const AllAchievements = () => {
    return(
        <section id="achievements" className="section">
            <div className="container">
                <ButtonNonOutline
                    href="/"
                    label=""
                    icon="arrow_back"
                />
                <h6 className="headline-2 reveal-up"> 
                    Achievements
                </h6>
                <div className="grid gap-x-4 gap-y-5">
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
            </div>
        </section>
    )
}

export default AllAchievements;