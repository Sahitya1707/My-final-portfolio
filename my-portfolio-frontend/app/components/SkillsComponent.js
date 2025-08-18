import React, { useEffect, useState } from "react";
import SkillCard from "./SKillCard";
import { SkillsData } from "../utils/skillsData";
import { backendURI } from "../utils/secret";
import Shimmer from "./Shimmer";

const SkillsComponent = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURI}/admin/data/skill/getAll`, {
          method: "GET",
          header: {},
        });
        if (response.ok) {
          const data = await response.json();
          setData(data.data[0].skillListed);
        }
      } catch (err) {
        console.log("Error coming while getting the data", err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[40vh] py-8 m-auto">
      <div
        className="bg-colorNav w-full max-w-6xl rounded-xl grid md:grid-cols-5 sm:grid-cols-3 grid-cols-1 shadow-lg shadow-colorText/5 py-3 my-6"
        id="skillComponent"
      >
        {data && data.length > 0 ? (
          data.map((e, i) => <SkillCard key={i} name={e} image={`${e}`} />)
        ) : (
          <Shimmer
            width={"30rem"}
            height={"20rem"}
            radius={"0px"}
            margin={"10px"}
          />
        )}
      </div>
    </div>
  );
};

export default SkillsComponent;
