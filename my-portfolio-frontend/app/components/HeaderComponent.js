import Link from "next/link";

const HeaderComponent = ({ text, link, handleNavList }) => {
  return (
    <Link href={link}>
      <li
        className="relative after:absolute after:h-[1px] hover:after:w-[100%] after:duration-75 after:ease-out after:w-[0%] after:bottom-0 after:left-0 after:content-[' '] after:bg-primary capitalize"
        onClick={handleNavList}
      >
        {text}{" "}
      </li>
    </Link>
  );
};

export default HeaderComponent;
