import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";
import project4 from "../assets/projects/project-4.jpg";

export const HERO_CONTENT = `I'm Dilsher from Hong Kong, with a Computer Engineering degree from HKUST, ranked in the global top 25. I'm passionate about the Web3 ecosystem and exploring languages that drive innovation. Always curious and committed to lifelong learning, I seek to enhance my skills and contribute to impactful projects.

`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2021 - Present",
    role: "Full Stack Web3 Developer",
    company: "Ipseity Network",
    description: [
      "Utilized React JS, SQL, encryption algorithms, and APIs to build a web application; developed an integrated mobile app using React Native.",
      "Led the development of a secure platform enabling data analysis for companies via homomorphic encryption.",
      "Created a unique marketplace for NFTs representing physical assets.",
      "Built responsive UI for both iOS and Android with custom features.",
      "Developed and tested blockchain-based smart contracts in Solidity, achieving top security audit scores from Hacken.",
      "Integrated backend with Web3 to facilitate seamless smart contract interactions.",
      "Designed and implemented RESTful APIs for server-side functionality.",
    ],
    technologies: ["Solidity", "Typescript", "Next.js", "NodeJS", "mongoDB"],
  },
  {
    year: "2020 - 2021",
    role: "Software Engineering Intern",
    company: "inGO Electric",
    description: [
      "Developed interactive front-end using HTML, CSS, and JavaScript.",
      "Automated data entries from Excel to Forms using Google Script Editor.",
      "Analyzed large survey data with Python (NumPy, Pandas, Scikit-learn) to identify target demographics for new products.",
    ],
    technologies: ["Python", "Javascript", "TailwindCSS", "Bootstrap"],
  },
];

export const PROJECTS = [
  {
    title: "E-Commerce Website",
    image: project1,
    description:
      "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
    technologies: ["HTML", "CSS", "React", "Node.js", "MongoDB"],
  },
  {
    title: "Task Management App",
    image: project2,
    description:
      "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
    technologies: ["HTML", "CSS", "Angular", "Firebase"],
  },
  {
    title: "Portfolio Website",
    image: project3,
    description:
      "A personal portfolio website showcasing projects, skills, and contact information.",
    technologies: ["HTML", "CSS", "React", "Bootstrap"],
  },
  {
    title: "Blogging Platform",
    image: project4,
    description:
      "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
    technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
  },
];

export const CONTACT = {
  address: "",
  phoneNo: "+91 9740071441",
  email: "dilshercareers@gmail.com",
};
