// work.js

export const works = [
  {
    id: "student-gpt",
    priority: 1,
    imgSrc: "/images/Student GPT.jpg",
    title: "Student GPT Mobile App UI Design (Design)",
    description: "A comprehensive UI/UX case study for an AI-powered academic assistant mobile application designed to help students manage their studies efficiently.",
    tags: ["Figma", "UI Design", "Mobile UI"],
    featured: true,
    role: "UI/UX Designer",
    duration: "2 Months",
    rating: "4.8",
    links: [
      { type: 'behance', url: "https://www.behance.net/gallery/223935725/Student-GPT-Your-Smart-Academic-Assistant" },
      { type: 'casestudy', url: "/casestudy/student-gpt" }
    ]
  },
  {
    id: "project-collab",
    priority: 2,
    imgSrc: "/images/ProjectCollab.jpg",
    title: "Project Collab Mobile App UI Design (Design)",
    description: "A platform designed to connect innovators and students for collaborative projects, featuring a sleek and intuitive mobile interface.",
    tags: ["Figma", "UI Design", "Mobile UI"],
    featured: true,
    role: "UI/UX Designer",
    duration: "2 Months",
    rating: "4.9",
    links: [
      { type: 'behance', url: "https://www.behance.net/gallery/226979827/ProjectCollab-Connecting-Innovators" },
      { type: 'casestudy', url: "/casestudy/project-collab" }
    ]
  },
  
  {
    id: "containerized-chronicles",
    priority: 6,
    imgSrc: "/images/Containerized_Chronicles.jpg",
    title: "Containerized Chronicles A Authenticated Blogging Platform",
    description: "A full-stack Django-based blogging platform with secure authentication, allowing users to create, edit, and share their stories in a containerized environment.",
    tags: ["Django", "Web App", "Blog Site"],
    featured: false,
    role: "Full-Stack Developer",
    links: [
      { type: 'github', url: "https://github.com/munirajubr/Containerized-Chronicles-An-authenticated-blogging-platform" },
      { type: 'casestudy', url: "/casestudy/containerized-chronicles" }
    ]
  },
  {
    id: "tripweaver",
    priority: 3,
    imgSrc: "/images/TripWeaver.png",
    title: "TripWeaver A Tour Plan Guide Web App Design (Design)",
    description: "A web-based tour planning guide that offers personalized recommendations and a user-friendly interface for travelers.",
    tags: ["Figma", "Web App", "UI Design"],
    featured: false,
    role: "UI/UX Designer",
    links: [
      { type: 'behance', url: "https://www.behance.net/gallery/232306887/TripWeaver-A-Trip-Planner-Website-UI-Design-Figma?share=1" },
      { type: 'casestudy', url: "/casestudy/tripweaver" }
    ]
  },
  {
    id: "agrivision",
    priority: 4,
    imgSrc: "/images/AgriVision.jpg",
    title: "AgriVision: Advanced Horticulture for Enhanced Brinjal Production",
    description: "An innovative IoT and Machine Learning project focused on optimizing brinjal production using React Native for the mobile interface.",
    tags: ["React Native", "Machine Learning", "IoT"],
    featured: true,
    role: "App Developer & UI/UX Designer",
    duration: "8 Months",
    rating: "4.7",
    links: [
      { type: 'github', url: "https://github.com/munirajubr/AgriVision-Mobile-App-using-React-Native" },
      { type: 'casestudy', url: "/casestudy/agrivision" },
    ]
  },
  {
    id: "whatsapp-channel-update",
    priority: 5,
    imgSrc: "/images/whatsappchannelupdate.png",
    title: "WhatsApp Channel Update (Case Study)",
    description: "An in-depth UX research study focusing on user painpoints within the WhatsApp Updates and Channels section.",
    tags: ["User Research", "UX Audit"],
    featured: false,
    role: "UX Researcher",
    duration: "1 Month",
    rating: "4.6",
    links: [
      { type: 'casestudy', url: "/casestudy/whatsapp-channel-update" }
    ]
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
      links: work.links,
      role: work.role,
      duration: work.duration,
      rating: work.rating,
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
      links: work.links,
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
    links: [
      { type: 'casestudy', url: "/casestudy/whatsapp-painpoints" }
    ],
  },
]