import Image from "next/image";
import BackgroundText from "./BackgroundText";
import ButtonTypeOne from "./ButtonTypeOne";
import HeadingTypeOne from "./HeadingTypeOne";

const AboutDescription = () => {
  return (
    <section className="relative py-10 px-4 sm:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-lg overflow-hidden">
      <HeadingTypeOne text="What I do?" />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
        <div className="bg-white/80 backdrop-blur-md rounded-xl  p-6 w-full lg:w-2/3">
          <p className="mb-6 text-base md:text-lg lg:text-[1.1rem] tracking-wide leading-relaxed text-gray-800">
            Hi, I'm Sahitya Neupane, a recent graduate of Interactive Media
            Design - Web from Georgian College. My journey in web development
            began in 2021, and I've enjoyed every moment since! JavaScript
            remains my favourite language, and I love building simple yet
            effective solutions.
            <br />
            <br />
            Professionally, I’ve worked as a Part-Time Web Developer at DS
            Digital Media, bringing client websites to life with WordPress and
            custom themes. During my internship at Digital Terai Nepal, I gained
            full-stack experience with React JS, Node JS, Express, and MongoDB.
            <br />
            <br />
            I’m always learning—currently exploring Python, TypeScript, Angular,
            and sharpening my problem-solving skills on LeetCode. I’m open to
            software developer roles and excited to contribute to innovative
            teams and projects.
            <br />
            <br />
            With a passion for continuous growth, I look forward to tackling new
            challenges and creating impactful web and software solutions. I’m
            always eager to learn and experiment with new technologies!
          </p>
          <div className="flex justify-start">
            <ButtonTypeOne
              text={"my projects"}
              color={"primary"}
              bgColor={"colorText"}
              link="/projects"
            />
          </div>
        </div>
        <div className="relative flex-shrink-0 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[400px] shadow-xl rounded-xl overflow-hidden border-2 ">
          <Image
            src={"/images/myimg.png"}
            alt="my-img"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <BackgroundText
        text={"?"}
        style={{
          WebkitTextStroke: "2px rgb(var(--primary-clr))",
          opacity: "0.2",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-10deg)",
          zIndex: "1",
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default AboutDescription;
