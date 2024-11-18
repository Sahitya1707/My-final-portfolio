const Header = () => {
  return (
    <header>
      <nav className="p-2">
        <ul className="flex  text-lg justify-evenly p-3 border-colorText/20 border-[1px] w-[40%] mx-auto rounded-xl bg-colorNav text-colorText">
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Skills</li>
          <li>Contact</li>
          <li>Resume</li>
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
