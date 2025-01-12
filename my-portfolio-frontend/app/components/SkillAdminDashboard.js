import { useEffect, useState } from "react";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { backendURI } from "../utils/secret";
import { CheckList } from "./ProjectForm";
import ButtonTypeOne from "./ButtonTypeOne";
import Shimmer from "./Shimmer";
import { useCrudData } from "../utils/stores/crudData";
import { SkillsData } from "../utils/skillsData";
import SkillCard from "./SKillCard";

const SkillAdminDashboard = () => {
  const tech = useCrudData((state) => state.tech);
  const updateTech = useCrudData((state) => state.updateTech);
  const updateSkills = useCrudData((state) => state.updateSkills);
  const skills = useCrudData((state) => state.skills);

  const [formData, setFormData] = useState({
    techUsed: [],
    // this will be selected only in the page of the dashboard
    nameOfTechSelected: [],
  });
  console.log(formData.nameOfTechSelected);
  const submitForm = async (e) => {
    e.preventDefault();
    console.log(formData.nameOfTechSelected);
    try {
      // TODO know why skill is not being sent to backend
      const response = await fetch(`${backendURI}/admin/data/skill/add`, {
        credentials: "include",
        method: "POST",

        headers: {
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*",
        },
        body: formData.nameOfTechSelected,
      });
      console.log(response);
    } catch (err) {
      console.log("Error submitting the form", err.message);
    }

    // updateSkills(formData.nameOfTechSelected);

    // console.log(e);
    // console.log(formData.techUsed);
  };

  console.log("skills", skills);
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
            : Array(15)
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
      {/* {skills &&
        skills.map((e, i) => {
          return;
        })} */}
    </div>
  );
};

export default SkillAdminDashboard;
