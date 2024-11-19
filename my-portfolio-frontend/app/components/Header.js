import { menuItems } from "../utils/constant";
import HeaderComponent from "./HeaderComponent";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { ActiveNavContext } from "./activeNavContext";
import { act, useContext } from "react";
const Header = () => {
  // read activeNav

  return (
    <header>
      <nav className="p-2">
        <ul className="flex  text-lg justify-evenly p-3 border-colorText/20 border-[1px] w-[40%] mx-auto rounded-xl bg-colorNav text-colorText tracking-wider items-center">
          {menuItems.map((e, i) => {
            return (
              <HeaderComponent
                text={e.name}
                link={e.link}
                key={i}
                index={i}
                handleNavList={(e) => {
                  // console.log(activeNav);
                }}
              />
            );
          })}

          <div className="flex items-center text-2xl">
            <button className="hidden">
              <CiLight />
            </button>
            <button>
              <CiDark />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
