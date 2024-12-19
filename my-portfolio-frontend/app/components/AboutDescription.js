import Image from "next/image";
import BackgroundText from "./BackgroundText";
import ButtonTypeOne from "./ButtonTypeOne";
import HeadingTypeOne from "./HeadingTypeOne";

const AboutDescription = () => {
  return (
    <>
      <HeadingTypeOne text="What I do?" />
      <div className="flex items-center lg:gap-y-0 gap-y-4 gap-x-10 xl:gap-x-5 justify-evenly h-full lg:flex-row flex-col-reverse">
        <div className="px-0 sm:px-5 lg:w-[60%] w-[90%] md:py-auto py-3">
          <p className="mb-2 xl:text-md lg:text-sm md:text-md text-sm">
            Hi, I'm Sahitya Neupane, currently studying Interactive Media Design
            - Web at Georgian College. My journey in web development started in
            2021, and I've loved every bit of it since! JavaScript is my
            favourite language, and I enjoy keeping things simple yet effective.{" "}
            <br />
            <br />
            I've gained hands-on experience working as a Part-Time Web Developer
            at DS Digital Media, where I work with WordPress and used different
            theme in order to make the client dream of making website into
            live.And, during my internship at Digital Terai Nepal, I dive deep
            into full-stack development with React JS, Node JS,Express and
            MongoDB.
            <br />
            <br />
            I'm always learning—whether it’s .NET, experimenting with Tailwind
            CSS, or building APIs, I thrive on growth and am excited to keep
            pushing boundaries in web development! <br />
            <br />
            Looking ahead, I am eager to apply my growing skill set to new
            challenges in web development. With a passion for continuous
            learning and a drive to create impactful web solutions, I look
            forward to contributing to innovative projects and teams in the near
            future. I am always eager to learn and don't afraid trying out new
            things.
          </p>
          <ButtonTypeOne
            text={"my resume"}
            color={"primary"}
            bgColor={"colorText"}
            link="/mycv.pdf"
            target={"_blank"}
          />
        </div>
        <div className="lg:h-[400px] lg:w-[350px] h-[350px] w-[250px]  relative z-[1005]">
          <Image
            src={"/images/myimg.png"}
            alt="my-img"
            objectFit="cover"
            fill
            className="rounded-sm md:rounded-xl w-full h-full left-0 top-0 object-cover"
          />
        </div>
      </div>
      <BackgroundText
        text={"?"}
        style={{
          WebkitTextStroke: "2px rgb(var(--primary-clr))",
          opacity: "40%",
          position: "fixed",
          top: " 50%",
          left: "50%",
          transform: " translate(-50%, -50%) rotate(-10deg)",
          zIndex: "1",
        }}
      />
    </>
  );
};

export default AboutDescription;
