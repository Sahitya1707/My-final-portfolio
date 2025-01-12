import { useEffect, useRef, useState } from "react";
import { useCrudData } from "../utils/stores/crudData";
import ButtonTypeOne from "./ButtonTypeOne";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { Input, TextArea } from "./Form";
import { RxCross2 } from "react-icons/rx";
import { backendURI } from "../utils/secret";
import { useParams } from "next/navigation";
import Shimmer from "./Shimmer";
import { usePopupStatus } from "../utils/stores/popup";
import { usePathname } from "next/navigation";

export const CheckList = ({ text, id, setSelectItem, selectedTechItem }) => {
  // ------------showing  popup after submission or vice versa
  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );
  const params = useParams();
  const router = usePathname();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // if the array of techUsed includes the id then it will have checked properties
    if (selectedTechItem.techUsed.includes(id)) {
      setChecked(true);
    }
  }, [selectedTechItem.techUsed]);

  const getCheckboxValue = (e) => {
    const limitOfItems = 4;
    if (
      e.target.checked &&
      router === "/admin/dashboard" &&
      !params.slug &&
      selectedTechItem.techUsed.length >= limitOfItems
    ) {
      // console.log("hi");
      setChecked(false);
      updatePopupContent(`Cannot select more then ${limitOfItems} items`);
      updateSuccessMessageIcon(false);
      updatePopupStatusForm(true);
      return;
    }

    // this means if current url is dashboard adn there is no params we will limit the checklist ot be 9 item - it will be used as a skill section

    if (e.target.checked) {
      // if e.target is checked getting it's value inside the array
      setSelectItem({
        ...selectedTechItem,
        ["techUsed"]: [...selectedTechItem.techUsed, e.target.id],
      });
      // setting checked to be true
      setChecked(true);
      console.log("-----------------");
      // console.log(selectedTechItem.techUsed.length);
    } else if (!e.target.checked) {
      // if checked is not true filtering the array to remove that items
      const filterItem = selectedTechItem.techUsed.filter((el) => {
        return el !== e.target.id;
      });

      // setting it checked to be false
      setChecked(false);
      setSelectItem({
        ...selectedTechItem,
        ["techUsed"]: filterItem,
      });
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        id={id}
        onChange={getCheckboxValue}
        checked={checked}
      />
      <label
        htmlFor={id}
        className="mx-2 uppercase"
        onClick={(e) => {
          if (
            router === "/admin/dashboard" &&
            !params.slug &&
            selectedTechItem.nameOfTechSelected
          ) {
            // checking the item to avoid the items to be dublicate
            if (
              selectedTechItem.nameOfTechSelected.includes(
                e.target.innerText.toLowerCase()
              ) &&
              selectedTechItem.nameOfTechSelected.length > 0
            ) {
              // filtering the array
              const filterArray = selectedTechItem.nameOfTechSelected.filter(
                (el) => {
                  return el !== e.target.innerText.toLowerCase();
                }
              );
              // console.log(filterArray, "filterArray");
              setSelectItem({
                ...selectedTechItem,
                ["nameOfTechSelected"]: filterArray,
              });

              return;
            }
            setSelectItem({
              ...selectedTechItem,
              ["nameOfTechSelected"]: [
                ...selectedTechItem.nameOfTechSelected,
                e.target.innerText.toLowerCase(),
              ],
            });
          }

          // console.log(e.target.innerText);
          // console.log(selectedTechItem.nameOfTechSelected);
        }}
      >
        {text.slice(0, -4)}
      </label>
    </li>
  );
};

const ProjectForm = () => {
  // global project data
  // const project = useCrudData((store) => store.project);
  // let's get the id
  const params = useParams();
  // this will set if the project form is edit or add, if it is true then it is add if not it is edit
  const projectFormState = useCrudData((state) => state.projectFormState);
  // ------------showing success popup after submission or vice versa
  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );

  // global project
  const setProject = useCrudData((store) => store.updateProject);

  // using state for formData -> tech
  const [techData, setTechData] = useState("");
  const [selectedTechData, setSelectedTechData] = useState([]);
  // creating the form DAta
  const [formData, setFormData] = useState({
    heading: "",
    projectLink: "",
    liveLink: "",
    description: "",
    order: "",
    techUsed: [],
  });
  const handleData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const projectFormPopup = useCrudData((state) => state.projectFormPopup);
  const setProjectFormPopup = useCrudData(
    (state) => state.updateProjectFormPopup
  );

  const handleClose = () => {
    setProjectFormPopup(false);
  };

  // this function will be for the edit nature of form

  const handleFormEdit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify(formData);
    try {
      const response = await fetch(
        `${backendURI}/admin/data/project/edit/${params.slug}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      );

      const respondedData = await response.json();
      if (response.ok) {
        updatePopupStatusForm(response.ok);
        updatePopupContent(respondedData.message);
        if (respondedData.data) {
          updatePopupStatusForm(respondedData.success);

          setProject(respondedData.data);
          setProjectFormPopup(false);
        } else {
          updateSuccessMessageIcon(respondedData.success);
        }
      }
    } catch (err) {
      console.log("Error fetching the data");
    }
  };

  // this function is for the add nature
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify(formData);

    try {
      const response = await fetch(`${backendURI}/admin/data/project/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      // const data = await response.json();
      if (response.ok) {
        const respondedData = await response.json();

        updatePopupStatusForm(response.ok);
        updatePopupContent(respondedData.message);
        if (respondedData.success) {
          setProject(respondedData.data);
          updateSuccessMessageIcon(respondedData.success);
          setProjectFormPopup(false);

          return;
        }
        updateSuccessMessageIcon(respondedData.success);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // there is id present in the url and projectFormState if false then calling the if statement and it will be edit form in this case
    if (params && !projectFormState) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${backendURI}/admin/data/project/${params.slug}`,
            {
              method: "GET",
              credentials: "include",
              headers: {},
            }
          );

          if (response.ok) {
            const data = await response.json();

            setFormData({
              heading: data.data.heading,
              description: data.data.description,
              liveLink: data.data.liveLink,
              order: data.data.order,
              projectLink: data.data.projectLink,
              techUsed: data.data.techUsed,
            });
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }

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
      console.log("error while fetch tech data for form");
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
        onSubmit={projectFormState ? handleFormSubmit : handleFormEdit}
      >
        <span
          className="absolute top-2 right-3 text-lg cursor-pointer text-colorText z-[503]"
          onClick={handleClose}
        >
          <RxCross2 />
        </span>
        <DashboardSecondHeading
          text={projectFormState ? "Add a project" : "Edit a Project"}
        />
        <Input
          inputType="text"
          placeholderText="Add a project name."
          label="heading"
          value={formData.heading}
          handleInput={handleData}
        />
        <Input
          inputType="text"
          value={formData.projectLink}
          placeholderText="Add a project link."
          label="projectLink"
          handleInput={handleData}
        />
        <Input
          inputType="text"
          placeholderText="Add a live link."
          label="liveLink"
          value={formData.liveLink}
          handleInput={handleData}
        />
        <Input
          inputType="Number"
          placeholderText="Add a order no."
          label="order"
          value={formData.order}
          handleInput={handleData}
        />
        <TextArea
          rows="4"
          placeholderText="Add a live link."
          label="description"
          value={formData.description}
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
                    // checkedId={formData.techUsed}
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
