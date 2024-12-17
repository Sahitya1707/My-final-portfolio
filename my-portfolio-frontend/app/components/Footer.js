const Footer = () => {
  return (
    <footer className="fixed bottom-0 border-t-2 border-solid border-primary left-0 w-full bg-colorNav text-colorText flex justify-center py-3 px-2 text-md">
      <span>
        Sahitya Portfolio | &copy; {new Date().getFullYear()} | Sahitya Neupane
      </span>
    </footer>
  );
};

export default Footer;
