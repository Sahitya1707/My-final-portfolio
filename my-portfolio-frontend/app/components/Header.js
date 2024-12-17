import { menuItems } from "../utils/constant";
import HeaderComponent from "./HeaderComponent";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

import ButtonTheme from "./ButtonTheme";

import { setCookie } from "cookies-next";
import { useTheme } from "../utils/stores/theme";
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
      <nav className="p-2">
        <ul className="flex  text-lg justify-evenly p-3 border-colorText/20 border-[1px] w-[55%] mx-auto rounded-xl bg-colorNav text-colorText tracking-wider items-center ">
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
      </nav>
    </header>
  );
};

export default Header;
