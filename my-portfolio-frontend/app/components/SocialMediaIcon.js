import Link from "next/link";
import React from "react";

const SocialMediaIcon = ({ link, icon, target }) => {
  return (
    <Link href={link} target={target}>
      <span className="hover:text-primary hover:duration-75 hover:ease-out duration-150">
        {icon}
      </span>
    </Link>
  );
};

export default SocialMediaIcon;
