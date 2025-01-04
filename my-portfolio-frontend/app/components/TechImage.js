import Image from "next/image";
import { useEffect } from "react";
import { backendURI } from "../utils/secret";
import { useCrudData } from "../utils/stores/crudData";
import Shimmer from "./Shimmer";

export const TechImageCard = ({ id, name }) => {
  return (
    <div className="flex  flex-col items-center" id={id}>
      <div className="xl:h-[4rem] xl:w-[4rem] sm:h-[3rem] sm:w-[3rem] h-[4rem] w-[4rem] relative ">
        <Image src={`${backendURI}/admin/images/${name}`} fill alt={``} />
      </div>
      <p className="uppercase xl:text-lg sm:text-sm tracking-wider text-center text-lg">
        {name}
      </p>
    </div>
  );
};

const TechImage = () => {
  const tech = useCrudData((state) => state.tech);
  const updateTech = useCrudData((state) => state.updateTech);
  console.log("TechImage");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURI}/admin/data/tech/getAll`, {
          method: "GET",
          credentials: "include",
          headers: {},
        });
        const data = await response.json();

        updateTech(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="my-2 flex  justify-start gap-x-10 items-center border-t-2 border-b-2 border-colorText/10 py-4">
      {tech && tech
        ? tech.map((e, i) => {
            return (
              <TechImageCard id={e._id} name={e.techImgName} key={e._id} />
            );
          })
        : Array(5)
            .fill(0)
            .map((e, i) => {
              return (
                <div className="flex flex-col" key={i}>
                  <Shimmer
                    height={"5rem"}
                    width={"5rem"}
                    radius={"50%"}
                    margin={"3px"}
                  />
                  <Shimmer
                    height={"2rem"}
                    width={"5rem"}
                    radius={"0"}
                    margin={"3px"}
                  />
                </div>
              );
            })}
    </div>
  );
};

export default TechImage;
