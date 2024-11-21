import { CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { socialMediaData } from "../utils/constant";
import SocialMediaIcon from "./SocialMediaIcon";
const SocialMediaHandle = () => {
  return (
    <div className="text-colorText flex flex-col gap-y-4 text-3xl fixed right-6 bottom-[6rem]">
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
  );
};

export default SocialMediaHandle;
