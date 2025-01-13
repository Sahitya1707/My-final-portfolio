import { useEffect, useState } from "react";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { backendURI } from "../utils/secret";
import { CheckList } from "./ProjectForm";
import ButtonTypeOne from "./ButtonTypeOne";
import Shimmer from "./Shimmer";
import { useCrudData } from "../utils/stores/crudData";
import { SkillsData } from "../utils/skillsData";
import SkillCard from "./SKillCard";
import { usePopupStatus } from "../utils/stores/popup";

import TechCard from "./TechCard";

const SkillAdminDashboard = () => {
  // ------------showing success popup after submission
  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );

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
      const response = await fetch(`${backendURI}/admin/data/skill/add`, {
        credentials: "include",
        method: "POST",

        headers: {
          // don't miss the content type while sending it to backend
          "Content-Type": "application/json",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*",
        },
        body: JSON.stringify(formData.nameOfTechSelected),
      });
      if (response.ok) {
        const data = await response.json();
        updatePopupContent(data.message);
        updatePopupStatusForm(data.success);
        updateSuccessMessageIcon(data.success);
        updateSkills(data.data);
      }
    } catch (err) {
      console.log("Error submitting the form", err.message);
    }

    // updateSkills(formData.nameOfTechSelected);

    // console.log(e);
    // console.log(formData.techUsed);
  };

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
          setFormData({
            ...formData,
            ["nameOfTechSelected"]: data.data[0].skillListed,
          });
        }
      } catch (err) {
        console.log("Error coming while getting the data", err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-2 border-b-2 border-colorText/10">
      <DashboardSecondHeading text={"Skills"} />
      <form
        onSubmit={submitForm}
        action="
      "
      >
        <ul className="grid grid-cols-7">
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

      <div className="my-2 grid grid-cols-7 gap-4">
        {formData.nameOfTechSelected && formData.nameOfTechSelected ? (
          formData.nameOfTechSelected.map((e, i) => {
            return <TechCard imageName={`${e}.svg`} key={i} />;
          })
        ) : (
          <Shimmer width={"5rem"} height={"1rem"} radius={"0"} />
        )}
      </div>
    </div>
  );
};

export default SkillAdminDashboard;
