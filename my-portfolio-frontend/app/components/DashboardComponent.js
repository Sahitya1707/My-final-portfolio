import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { useActiveNav } from "../utils/stores/activeNav";

import ButtonTypeOne from "./ButtonTypeOne";
import { colorMapping } from "../utils/Colors";

export const DashboardIconText = ({ icon, text, link, index, bgColor }) => {
  const activeDashboard = useActiveNav((state) => state.activeDashboard);

  return (
    <Link href={link}>
      <li
        className={`uppercase  p-2 rounded-lg text-lg  flex items-center gap-x-3 mt-3 ${
          index === activeDashboard ? "bg-colorNav/100" : "bg-colorNav/30"
        } hover:bg-colorNav duration-75 ease-in text-colorText`}
        style={{
          backgroundColor: `${bgColor ? colorMapping[bgColor] : ""}`,
        }}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </li>
    </Link>
  );
};

export const DashboardMainComponent = ({
  link,
  linkText,
  text,
  icon,
  btnColor,
  btnBgColor,
  componentBgColor,
  handleClick,
  btnText,
}) => {
  return (
    <div
      className="bg-primary px-3 py-4 w-[17rem] rounded-lg "
      style={{
        backgroundColor: `${colorMapping[componentBgColor]}`,
      }}
    >
      <p className="flex gap-2 items-center">
        <span className="font-bold">{icon}</span>
        {text}
      </p>
      <ButtonTypeOne
        text={btnText}
        color={btnColor}
        bgColor={btnBgColor}
        link={linkText}
        handleClick={handleClick}
      />
    </div>
  );
};
