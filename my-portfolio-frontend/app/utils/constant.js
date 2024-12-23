import { FaGithub, FaLink, FaLinkedin, FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { GoProject } from "react-icons/go";
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

  // {
  //   name: "experience",
  //   link: "/experience",
  // },
  {
    name: "contact",
    link: "/contact",
  },
  {
    name: "Resume",
    link: "/mycv.pdf",
    target: "_blank",
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
export const dashboardMenu = [
  {
    icon: <IoHome />,
    link: "/admin/dashboard",
    text: "dashboard",
  },
  {
    icon: <LiaPagerSolid />,
    link: "/admin/page",
    text: "page",
  },
  {
    icon: <GoProject />,
    link: "/admin/projects",
    text: "Projects",
  },
];
