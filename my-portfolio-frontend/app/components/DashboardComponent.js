import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { LiaPagerSolid } from "react-icons/lia";
import { useActiveNav } from "../utils/stores/activeNav";

export const DashboardIconText = ({ icon, text, link, index }) => {
  const activeDashboard = useActiveNav((state) => state.activeDashboard);
  console.log(activeDashboard, index);

  return (
    <Link href={link}>
      <li
        className={`uppercase  p-2 rounded-lg text-lg  flex items-center gap-x-3 mt-3 ${
          index === activeDashboard ? "bg-colorText/100" : "bg-colorText/30"
        } hover:bg-colorText duration-75 ease-in`}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </li>
    </Link>
  );
};
