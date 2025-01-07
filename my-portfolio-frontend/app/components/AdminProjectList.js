import { useEffect } from "react";
import { backendURI } from "../utils/secret";
import { useCrudData } from "../utils/stores/crudData";
import Link from "next/link";
import Shimmer from "./Shimmer";
import { MdDelete } from "react-icons/md";
import { usePopupStatus } from "../utils/stores/popup";

const AdminProjectList = () => {
  // setting the project data

  const project = useCrudData((store) => store.project);
  const setProject = useCrudData((store) => store.updateProject);

  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backendURI}/admin/data/project/getAll`, {
        credentials: "include",
        method: "GET",
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();

        setProject(data.data);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch(
      `${backendURI}/admin/data/project/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProject(data.data);
      updatePopupContent(data.message);
      updatePopupStatusForm(data.status);
      updateSuccessMessageIcon(data.status);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {project && project ? (
        <ul className="space-y-4">
          {project.map((p) => (
            <li
              key={p._id}
              className="bg-primary/50 border-2 border-colorText/80 shadow-md shadow-colorText/30 rounded-lg p-4 flex justify-between items-center hover:duration-100 hover:ease-in hover:shadow-md transition-shadow w-[80%]"
            >
              <Link href={`/projects/${p._id}`}>
                <span className="text-blue-600 font-semibold hover:underline">
                  {p.heading}
                </span>
              </Link>
              <button
                onClick={() => {
                  handleDelete(p._id);
                }}
                className="text-[red] text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        Array(5)
          .fill(0)
          .map((e, i) => {
            return (
              <Shimmer
                key={i}
                width={"80%"}
                radius={"0.5rem"}
                height={"3rem"}
                margin={"10px 0px"}
              />
            );
          })
      )}
    </div>
  );
};

export default AdminProjectList;
