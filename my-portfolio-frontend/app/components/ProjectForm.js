import { useEffect, useRef, useState } from "react";
import { useCrudData } from "../utils/stores/crudData";
import ButtonTypeOne from "./ButtonTypeOne";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { Input, TextArea } from "./Form";
import { RxCross2 } from "react-icons/rx";
import { backendURI } from "../utils/secret";
import Shimmer from "./Shimmer";

export const CheckList = ({ text, id, setSelectItem, selectedTechItem }) => {
  console.log(selectedTechItem);
  const getCheckboxValue = (e) => {
    if (e.target.checked) {
      // console.log(e.target.id);
      // setSelectItem([...selectedTechItem, e.target.id]);
      setSelectItem({
        ...selectedTechItem,
        ["techUsed"]: [...selectedTechItem.techUsed, e.target.id],
      });
    } else {
      const filterItem = selectedTechItem.techUsed.filter((el) => {
        console.log("false");
        return el !== e.target.id;
      });
      setSelectItem({
        ...selectedTechItem,
        ["techUsed"]: filterItem,
      });
      // setSelectItem(filterItem);
    }
  };

  return (
    <li>
      <input type="checkbox" id={id} onChange={getCheckboxValue} />
      <label htmlFor={id} className="mx-2 uppercase">
        {text.slice(0, -4)}
      </label>
    </li>
  );
};

const ProjectForm = () => {
  // using state for formData -> tech
  const [techData, setTechData] = useState("");
  const [selectedTechData, setSelectedTechData] = useState([]);
  // creating the form DAta
  const [formData, setFormData] = useState({
    heading: "",
    projectLink: "",
    liveLink: "",
    description: "",
    techUsed: [],
  });
  const handleData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);

  const projectFormPopup = useCrudData((state) => state.projectFormPopup);
  const setProjectFormPopup = useCrudData(
    (state) => state.updateProjectFormPopup
  );

  const handleClose = () => {
    setProjectFormPopup(false);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // setFormData({ ...formData, ["techUsed"]: selectedTechData });
    console.log(formData);

    // try {
    //   await fetch(`${backendURI}/admin/data/project/add`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // } catch (err) {}
  };
  useEffect(() => {
    if (projectFormPopup === true) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${backendURI}/admin/data/tech/getAll`, {
            method: "GET",
            credentials: "include",
            headers: {},
          });
          const data = await response.json();
          setTechData(data.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    } else {
      setTechData(false);
    }
  }, [projectFormPopup]);
  return (
    <div className="fixed z-[500]  h-[100vh] w-[100vw] top-0 right-0 left-0 flex items-center justify-center duration-50 ease-out ">
      <span
        className="absolute top-0 z-[501] w-full h-full backdrop-blur-sm"
        onClick={handleClose}
      ></span>

      <form
        action="
      "
        className="relative z-[502] w-[65rem] px-4 border-2 border-colorText/20 p-2  shadow-xl shadow-colorText/10 rounded-lg bg-colorNav"
        onSubmit={handleFormSubmit}
      >
        <span
          className="absolute top-2 right-3 text-lg cursor-pointer text-colorText z-[503]"
          onClick={handleClose}
        >
          <RxCross2 />
        </span>
        <DashboardSecondHeading text={"add project"} />
        <Input
          inputType="text"
          placeholderText="Add a project name."
          label="heading"
          value={formData.heading}
          handleInput={handleData}
        />
        <Input
          inputType="text"
          placeholderText="Add a project link."
          label="projectLink"
          handleInput={handleData}
        />
        <Input
          inputType="text"
          placeholderText="Add a live link."
          label="liveLink"
          handleInput={handleData}
        />
        <TextArea
          rows="4"
          placeholderText="Add a live link."
          label="description"
          handleTextArea={handleData}
        />
        <DashboardSecondHeading text={"Tech used"} />
        <ul className="flex flex-wrap gap-x-4">
          {techData && techData
            ? techData.map((e, i) => {
                return (
                  <CheckList
                    key={e._id}
                    id={e._id}
                    text={e.techImgName}
                    setSelectItem={setFormData}
                    selectedTechItem={formData}
                  />
                );
              })
            : Array(5)
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
        <ButtonTypeOne
          color={"primary"}
          bgColor={"colorText"}
          text={"submit"}
        />
      </form>
    </div>
  );
};

export default ProjectForm;
