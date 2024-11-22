import React from "react";
import HeadingTypeOne from "../components/HeadingTypeOne";

const Projects = () => {
  return (
    <>
      <HeadingTypeOne text={"My Projects"} />
      <div
        className="w-[90%] mx-auto max-w-[80rem] h-[90%] my-auto mt-6 border-2 border-primary rounded-xl overflow-y-scroll realtive shadow-colorText/50 shadow-md"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <span>
          <div class="btn-group">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              ?
            </button>
            <div
              class="dropdown-menu dropdown-menu-start"
              aria-labelledby="triggerId"
            >
              <a class="dropdown-item" href="#">
                Action
              </a>
              <a class="dropdown-item disabled" href="#">
                Disabled action
              </a>
              <h6 class="dropdown-header">Section header</h6>
              <a class="dropdown-item" href="#">
                Action
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                After divider action
              </a>
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Projects;
