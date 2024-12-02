import { FaGithub, FaLink, FaLinkedin, FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export const backendConnect = "http://localhost:2001";
export const menuItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Skills",
    link: "/skills",
  },

  {
    name: "experience",
    link: "/experience",
  },
  {
    name: "contact",
    link: "/contact",
  },
  {
    name: "Resume",
    link: "/some-where_else",
  },
];

export const socialMediaData = [
  {
    icon: <FaGithub />,
    link: "https://github.com/Sahitya1707",
    target: "_blank",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/sahitya-neupane-3b0697212/",
    target: "_blank",
  },
  {
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@sahitya9708",
    target: "_blank",
  },
  {
    icon: <CiMail />,
    link: "mailto:neupanesahitya1@gmail.com",
    target: "_self",
  },
];
