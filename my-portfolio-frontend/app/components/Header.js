import { menuItems } from "../utils/constant";
import HeaderComponent from "./HeaderComponent";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiTwotoneHome } from "react-icons/ai";
import { RiHome4Line } from "react-icons/ri";
import ButtonTheme from "./ButtonTheme";
import { RxCross2 } from "react-icons/rx";
import { setCookie } from "cookies-next";
import { useTheme } from "../utils/stores/theme";
import { socialMediaData } from "../utils/constant";
import Link from "next/link";
import SocialMediaIcon from "./SocialMediaIcon";
import { useEffect, useState } from "react";

export const Icon = ({ icon, handleClick }) => {
  return (
    <span className="text-xl cursor-pointer" onClick={handleClick}>
      {icon}
    </span>
  );
};

const Header = () => {
  const setTheme = useTheme((state) => state.updateTheme);
  const theme = useTheme((state) => state.theme);
  const [openModal, setOpenModal] = useState(false);
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
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    setOpenModal(false);
  }, []);
  return (
    <header className="md:relative z-[1005] max-w-[150rem] mx-auto sticky top-0">
      <nav
        className={`md:p-2 md:pt-auto pt-4 sticky top-0 md:bg-auto  before:absolute before:top-0 before:left-0 before:right-0 before:h-4 before:backdrop-blur-sm before:z-[-1]`}
      >
        <ul
          className={` md:static text-2xl md:text-lg md:justify-evenly md:p-3 md:border-colorText/20 md:border-[1px] xl:w-[45%] lg:w-[60%] md:w-[70%] mx-auto rounded-xl md:bg-colorNav text-colorText tracking-wider md:items-center  left-0 w-[100%] z-[1005] md:h-[auto] h-screen backdrop-blur-lg md:bg-[colorBody] flex md:flex-row flex-col justify-center items-start md:px-auto px-10 md:gap-y-auto gap-y-5 fixed  duration-200 ${
            openModal ? "top-0 ease-in" : "top-[-100%] ease-out"
          }`}
          onClick={handleCloseModal}
        >
          <span
            className="text-5xl absolute top-4 md:hidden cursor-pointer"
            onClick={handleCloseModal}
          >
            <RxCross2 />
          </span>

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
          {/* social media icon */}
          <div className="text-colorText flex  gap-x-8 lg:text-3xl text-2xl  lg:bottom-[6rem] z-[1001] md:hidden mt-4">
            {socialMediaData.map((e, i) => {
              return (
                <SocialMediaIcon
                  icon={e.icon}
                  link={e.link}
                  target={e.target}
                  key={i}
                />
              );
            })}{" "}
          </div>

          <div className="hidden items-center text-2xl md:flex ">
            {theme === "dark" ? (
              <ButtonTheme icon={<CiLight />} handleTheme={toggleLightMode} />
            ) : (
              <ButtonTheme icon={<CiDark />} handleTheme={toggleDarkMode} />
            )}
          </div>
        </ul>
        {/* mobile nav */}
        <ul className="md:hidden  text-colorText flex justify-between p-3 border-colorText/20 border-[1px] w-[95%] mx-auto rounded-xl bg-colorNav/60 items-center backdrop-blur-md ">
          <Icon icon={<HiOutlineMenuAlt3 />} handleClick={handleOpenModal} />
          <Link href="/">
            <Icon icon={<RiHome4Line />} handleClick={() => {}} />
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
