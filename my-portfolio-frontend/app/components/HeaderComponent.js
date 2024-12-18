import Link from "next/link";

import { useActiveNav } from "../utils/stores/activeNav";

const HeaderComponent = ({ text, link, handleNavList, index, target }) => {
  // reading the current activeNav value
  // const { activeNav } = useContext(ActiveNavContext);
  const activeNav = useActiveNav((state) => state.activeNav);

  return (
    <li
      className={`relative after:absolute after:h-[2px]  after:duration-100 after:ease-out after:bottom-0 after:left-0 after:content-[' ']  after:bg-primary md:capitalize  uppercase hover:after:w-[100%] ${
        activeNav === index ? "md:after:w-[100%]" : " after:w-[0%] "
      }`}
      onClick={handleNavList}
    >
      {" "}
      <Link href={link} target={target ? target : ""}>
        {text}{" "}
      </Link>
    </li>
  );
};

export default HeaderComponent;
