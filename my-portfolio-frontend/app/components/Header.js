import { menuItems } from "../utils/constant";
import HeaderComponent from "./HeaderComponent";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiTwotoneHome } from "react-icons/ai";
import { RiHome4Line } from "react-icons/ri";
import ButtonTheme from "./ButtonTheme";

import { setCookie } from "cookies-next";
import { useTheme } from "../utils/stores/theme";
import Link from "next/link";

export const Icon = ({ icon }) => {
  return <span className="text-xl">{icon}</span>;
};

const Header = () => {
  const setTheme = useTheme((state) => state.updateTheme);
  const theme = useTheme((state) => state.theme);
  // read theme value
  // const { theme, setTheme } = useContext(ThemeContext);

  // intriquing the function toggle light and toggle dark
  const toggleLightMode = () => {
    setTheme("light");
    setCookie("theme", "light");
  };
  // dark mode
  const toggleDarkMode = () => {
    setTheme("dark");
    setCookie("theme", "dark");
  };
  return (
    <header className="relative z-[1000] max-w-[150rem] mx-auto">
      <nav className="md:p-2 p-4">
        <ul className="md:flex  text-md justify-evenly p-3 border-colorText/20 border-[1px] xl:w-[45%] lg:w-[60%] w-[70%] mx-auto rounded-xl bg-colorNav text-colorText tracking-wider items-center hidden ">
          {menuItems.map((e, i) => {
            return (
              <HeaderComponent
                text={e.name}
                link={e.link}
                target={e.target}
                key={i}
                index={i}
                handleNavList={(e) => {
                  // console.log(activeNav);
                }}
              />
            );
          })}

          <div className="flex items-center text-2xl">
            {theme === "dark" ? (
              <ButtonTheme icon={<CiLight />} handleTheme={toggleLightMode} />
            ) : (
              <ButtonTheme icon={<CiDark />} handleTheme={toggleDarkMode} />
            )}
          </div>
        </ul>
        {/* mobile nav */}
        <ul className="md:hidden  text-colorText flex justify-between p-3 border-colorText/20 border-[1px] w-[70%] mx-auto rounded-xl bg-colorNav items-center">
          <Icon icon={<HiOutlineMenuAlt3 />} />
          <Link href="/">
            <Icon icon={<RiHome4Line />} />
          </Link>

          <div className="flex items-center text-2xl">
            {theme === "dark" ? (
              <ButtonTheme icon={<CiLight />} handleTheme={toggleLightMode} />
            ) : (
              <ButtonTheme icon={<CiDark />} handleTheme={toggleDarkMode} />
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
