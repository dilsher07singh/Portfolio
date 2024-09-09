import project1 from "../assets/projects/project-1.jpg";
import project2 from "../assets/projects/project-2.jpg";
import project3 from "../assets/projects/project-3.jpg";

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
    title: "DualMint Marketplace",
    image: project1,
    description:
      "A fully functional marketplace with an audited smart contract from Hacken. Built for crowdfunding projects and RWAT",
    technologies: [
      "Solidity",
      "React",
      "nodeJS",
      "MongoDB",
      "MaterialUI",
      "AWS",
    ],
    link: "https://explore.dualmint.com/",
  },
  {
    title: "Dualmint Marketing Page",
    image: project2,
    description:
      "A static website made using Wix that provides information about the project and its team. Fully functional with interactive features.",
    technologies: ["Wix", "HTML", "CSS"],
    link: "https://www.dualmint.com/",
  },
  {
    title: "Ipseity Network Web and Mobile Version",
    image: project3,
    description:
      "Designed and integrated a decentralized platform where individuals retain full ownership and control of their personal data, allowing them to share it with companies on their own terms",
    technologies: ["Cybersecurity", "Javascript", "mySQL"],
    link: "https://www.ipseity.network/",
  },
];

export const CONTACT = {
  address: "",
  phoneNo: "+91 9740071441",
  email: "dilshercareers@gmail.com",
};
