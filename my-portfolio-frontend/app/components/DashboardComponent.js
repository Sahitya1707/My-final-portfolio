import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { useActiveNav } from "../utils/stores/activeNav";

import ButtonTypeOne from "./ButtonTypeOne";
import { colorMapping } from "../utils/Colors";

export const DashboardIconText = ({ icon, text, link, index }) => {
  const activeDashboard = useActiveNav((state) => state.activeDashboard);

  return (
    <Link href={link}>
      <li
        className={`uppercase  p-2 rounded-lg text-lg  flex items-center gap-x-3 mt-3 ${
          index === activeDashboard ? "bg-colorText/100" : "bg-colorText/30"
        } hover:bg-colorText duration-75 ease-in text-colorNav`}
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
      />
    </div>
  );
};
