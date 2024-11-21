import Link from "next/link";
import { useContext } from "react";
import { ActiveNavContext } from "./activeNavContext";

const HeaderComponent = ({ text, link, handleNavList, index }) => {
  // reading the current activeNav value
  const { activeNav } = useContext(ActiveNavContext);

  return (
    <li
      className={`relative after:absolute after:h-[2px]  after:duration-100 after:ease-out after:bottom-0 after:left-0 after:content-[' '] after:bg-primary capitalize ${
        activeNav === index
          ? "after:w-[100%]"
          : "hover:after:w-[100%] after:w-[0%] "
      }`}
      onClick={handleNavList}
    >
      {" "}
      <Link href={link}>{text} </Link>
    </li>
  );
};

export default HeaderComponent;
