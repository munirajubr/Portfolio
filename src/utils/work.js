// work.js

export const works = [
  {
    id: "student-gpt",
    imgSrc: "/images/Student GPT.jpg",
    title: "Student GPT Mobile App UI Design (Case Study)",
    description: "A comprehensive UI/UX case study for an AI-powered academic assistant mobile application designed to help students manage their studies efficiently.",
    tags: ["Figma", "UI Design", "Mobile UI"],
    featured: true,
    projectLink:
      "https://www.behance.net/gallery/223935725/Student-GPT-Your-Smart-Academic-Assistant",
  },
  {
    id: "project-collab",
    imgSrc: "/images/ProjectCollab.jpg",
    title: "Project Collab Mobile App UI Design (Case Study)",
    description: "A platform designed to connect innovators and students for collaborative projects, featuring a sleek and intuitive mobile interface.",
    tags: ["Figma", "UI Design", "Mobile UI"],
    featured: true,
    projectLink:
      "https://www.behance.net/gallery/226979827/ProjectCollab-Connecting-Innovators",
  },
  {
    id: "trip-planner",
    imgSrc: "/images/Trip_planner_app_UI.jpg",
    title: "Trip Planner Mobile App UI Design (Design)",
    description: "An elegant travel planning application that helps users organize their itineraries, explore new destinations, and manage bookings seamlessly.",
    tags: ["Figma", "UI Design", "Mobile UI"],
    featured: false,
    projectLink: "",
  },
  
  {
    id: "containerized-chronicles",
    imgSrc: "/images/Containerized_Chronicles.jpg",
    title: "Containerized Chronicles A Authenticated Blogging Platform",
    description: "A full-stack Django-based blogging platform with secure authentication, allowing users to create, edit, and share their stories in a containerized environment.",
    tags: ["Django", "Web App", "Blog Site"],
    featured: false,
    projectLink: "https://github.com/munirajubr/Containerized-Chronicles-An-authenticated-blogging-platform",
  },
  {
    id: "tripweaver",
    imgSrc: "/images/TripWeaver.png",
    title: "TripWeaver A Tour Plan Guide Web App Design (Design)",
    description: "A web-based tour planning guide that offers personalized recommendations and a user-friendly interface for travelers.",
    tags: ["Figma", "Web App", "UI Design"],
    featured: false,
    projectLink: "https://www.behance.net/gallery/232306887/TripWeaver-A-Trip-Planner-Website-UI-Design-Figma?share=1",
  },
  {
    id: "agrivision",
    imgSrc: "/images/AgriVision.jpg",
    title: "AgriVision: Advanced Horticulture for Enhanced Brinjal Production",
    description: "An innovative IoT and Machine Learning project focused on optimizing brinjal production using React Native for the mobile interface.",
    tags: ["React Native", "Machine Learning", "IoT"],
    featured: true,
    projectLink: "https://github.com/munirajubr/AgriVision-Mobile-App-using-React-Native",
  },
];

const themeColors = ['green', 'red', 'light-orange', 'blue', 'pink', 'purple'];

export const getHomeProjects = () => {
  return works.filter(work => work.featured).map((work, index) => {
    const shuffledColors = [...themeColors].sort(() => 0.5 - Math.random());
    return {
      id: work.id,
      tags: work.tags.map((tag, i) => [tag, shuffledColors[i % shuffledColors.length]]),
      title: work.title,
      desc: work.description,
      img: work.imgSrc,
      caseColor: index % 2 === 0 ? '#4e4ce1' : '#fe90e7',
      reverse: index % 2 === 1
    };
  });
};

export const getAllProjects = () => {
  return works.map((work, index) => {
    const shuffledColors = [...themeColors].sort(() => 0.5 - Math.random());
    return {
      id: work.id,
      tags: work.tags.map((tag, i) => [tag, shuffledColors[i % shuffledColors.length]]),
      title: work.title.replace(' (Case Study)', '').replace(' (Design)', ''),
      desc: work.description,
      img: work.imgSrc,
      caseColor: index % 2 === 0 ? 'var(--purple)' : 'var(--pink)',
      reverse: index % 2 === 1
    };
  });
};

export const getProjectsCount = () => works.length;


export const otherworks = [
  {
    image: "",
    title: "Whatsapp users painpoint identification",
    description: "User painpoints in the channels in Updates Section",
    tags: "",
    featured: true,
    link: "",
  },
]