import { useCrudData } from "../utils/stores/crudData";
import ButtonTypeOne from "./ButtonTypeOne";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { Input, TextArea } from "./Form";
import { RxCross2 } from "react-icons/rx";

const ProjectForm = () => {
  const setProjectFormPopup = useCrudData(
    (state) => state.updateProjectFormPopup
  );

  const handleClose = () => {
    setProjectFormPopup(false);
  };
  return (
    <div className="fixed z-[500]  h-[100vh] w-[100vw] top-0 right-0 left-0 flex items-center justify-center duration-50 ease-out ">
      <span
        className="absolute top-0 z-[501] w-full h-full backdrop-blur-sm"
        onClick={handleClose}
      ></span>

      <form
        action="
      "
        className="relative z-[502] w-[65rem] px-4 border-2 border-colorText/20 p-2  shadow-xl shadow-colorText/10 rounded-lg"
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
        />
        <Input
          inputType="text"
          placeholderText="Add a project link."
          label="project-link"
        />
        <Input
          inputType="text"
          placeholderText="Add a live link."
          label="live-link"
        />
        <TextArea
          rows="4"
          placeholderText="Add a live link."
          label="project-description"
        />
        <ul>
          <DashboardSecondHeading text={"Tech used"} />
          <li>
            <input type="checkbox" id="react" />{" "}
            <label htmlFor="react">React</label>
          </li>
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
