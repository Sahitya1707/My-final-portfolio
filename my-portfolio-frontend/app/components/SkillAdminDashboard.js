import { useEffect, useState } from "react";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { backendURI } from "../utils/secret";
import { CheckList } from "./ProjectForm";
import ButtonTypeOne from "./ButtonTypeOne";
import Shimmer from "./Shimmer";
import { useCrudData } from "../utils/stores/crudData";

const SkillAdminDashboard = () => {
  const tech = useCrudData((state) => state.tech);
  const updateTech = useCrudData((state) => state.updateTech);

  const [formData, setFormData] = useState({
    techUsed: [],
  });

  const submitForm = (e) => {
    // e.preventDefault();
    console.log(e);
  };
  return (
    <div className="py-2 border-b-2 border-colorText/10">
      <DashboardSecondHeading text={"Skills"} />
      <form
        onSubmit={submitForm}
        action="
      "
      >
        <ul className="grid grid-cols-5">
          {tech && tech
            ? tech.map((e, i) => {
                return (
                  <CheckList
                    key={e._id}
                    id={e._id}
                    text={e.techImgName}
                    setSelectItem={setFormData}
                    selectedTechItem={formData}
                    // checkedId={formData.techUsed}
                  />
                );
              })
            : Array(10)
                .fill(0)
                .map((e, i) => {
                  return (
                    <Shimmer
                      key={i}
                      height={"2rem"}
                      width={"4rem"}
                      margin={"2px 2px"}
                      borderRadius={"0px"}
                    />
                  );
                })}
        </ul>

        <ButtonTypeOne color={"primary"} bgColor={"colorNav"} text={"submit"} />
      </form>
    </div>
  );
};

export default SkillAdminDashboard;
