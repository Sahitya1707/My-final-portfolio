import Image from "next/image";
import { useEffect } from "react";
import { backendURI } from "../utils/secret";
import { useCrudData } from "../utils/stores/crudData";
import Shimmer from "./Shimmer";
import { IoCloseSharp } from "react-icons/io5";

export const TechImageCard = ({ id, name }) => {
  const updateTech = useCrudData((state) => state.updateTech);
  const handleDelete = async (e) => {
    const response = await fetch(`${backendURI}/admin/data/tech/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    updateTech(data.data);
  };
  return (
    <div className="flex  flex-col items-center">
      <div className="xl:h-[4rem] xl:w-[4rem] sm:h-[3rem] sm:w-[3rem] h-[4rem] w-[4rem] relative ">
        <Image
          src={`${backendURI}/admin/images/${name}`}
          fill
          alt={`${name.slice(0, -4)} image`}
        />
        <span
          className="top-[-12px] right-[-15px] absolute text-[#ff0000bc] duration-75 hover:bg-primary/10 font-bold p-1  border-2 border-colorText/10 rounded-full cursor-pointer"
          onClick={handleDelete}
        >
          <IoCloseSharp />
        </span>
      </div>
      <p className="uppercase tracking-wider text-center text-sm">
        {name.slice(0, -4)}
      </p>
    </div>
  );
};

const TechImage = () => {
  const tech = useCrudData((state) => state.tech);
  const updateTech = useCrudData((state) => state.updateTech);

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
    <div className="my-2 grid grid-cols-8 gap-4 justify-start gap-x-10 items-center border-t-2 border-b-2 border-colorText/10 py-4">
      {tech && tech
        ? tech.map((e, i) => {
            return (
              <TechImageCard id={e._id} name={e.techImgName} key={e._id} />
            );
          })
        : Array(15)
            .fill(0)
            .map((e, i) => {
              return (
                <div className="" key={i}>
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
