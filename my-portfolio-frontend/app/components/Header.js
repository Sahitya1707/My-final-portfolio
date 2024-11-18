import { menuItems } from "../utils/constant";
import HeaderComponent from "./HeaderComponent";

const Header = () => {
  return (
    <header>
      <nav className="p-2">
        <ul className="flex  text-lg justify-evenly p-3 border-colorText/20 border-[1px] w-[40%] mx-auto rounded-xl bg-colorNav text-colorText tracking-wider">
          {menuItems.map((e, i) => {
            return <HeaderComponent text={e.name} link={e.link} key={i} />;
          })}

          <div className="flex">
            <button className="hidden">Dark Mode</button>
            <button>Light Mode</button>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
