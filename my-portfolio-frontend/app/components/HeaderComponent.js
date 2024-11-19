import Link from "next/link";
import { useContext } from "react";
import { ActiveNavContext } from "./activeNavContext";

const HeaderComponent = ({ text, link, handleNavList, index }) => {
  console.log(index);
  // reading the current activeNav value
  const { activeNav } = useContext(ActiveNavContext);
  console.log(activeNav);
  return (
    <Link href={link}>
      <li
        className={`relative after:absolute after:h-[1px]  after:duration-75 after:ease-out after:bottom-0 after:left-0 after:content-[' '] after:bg-primary capitalize ${
          activeNav === index
            ? "after:w-[100%]"
            : "hover:after:w-[100%] after:w-[0%] "
        }`}
        onClick={handleNavList}
      >
        {text}{" "}
      </li>
    </Link>
  );
};

export default HeaderComponent;
