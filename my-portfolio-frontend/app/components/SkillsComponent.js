import React, { useEffect, useState } from "react";
import SkillCard from "./SKillCard";
import { SkillsData } from "../utils/skillsData";
import { backendURI } from "../utils/secret";
import Shimmer from "./Shimmer";

const SkillsComponent = () => {
  const [data, setData] = useState();
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURI}/admin/data/skill/getAll`, {
          method: "GET",
          credentials: "include",
          header: {},
        });
        if (response.ok) {
          const data = await response.json();
          // updateSkills(data.data[0].skillListed);
          //   console.log(data.data);
          setData(data.data[0].skillListed);
        }
      } catch (err) {
        console.log("Error coming while getting the data", err.message);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div
      className="bg-colorNav w-[90%]   md:w-[80%] xl:w-[70%] mx-auto mg:mt-auto lg:mt-[5rem] sm:my-auto   rounded-xl grid md:grid-cols-5 shadow-lg shadow-colorText/5 sm:grid-cols-3 grid-cols-1 py-3 my-6"
      id="skillComponent"
    >
      {data && data ? (
        data.map((e, i) => {
          return <SkillCard key={i} name={e} image={`${e}`} />;
        })
      ) : (
        <Shimmer
          width={"30rem"}
          height={"20rem"}
          radius={"0px"}
          margin={"10px"}
        />
      )}
    </div>
  );
};

export default SkillsComponent;
