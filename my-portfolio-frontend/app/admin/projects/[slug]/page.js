"use client";
import CrudBtn from "@/app/components/CrudBtn";
import Shimmer from "@/app/components/Shimmer";
import TechCard from "@/app/components/TechCard";
import { backendURI } from "@/app/utils/secret";
import { useCrudData } from "@/app/utils/stores/crudData";
import { usePopupStatus } from "@/app/utils/stores/popup";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
// Example: A function to get all project slugs, replace with your actual data fetching logic

// export async function generateStaticParams() {
//   const slugs = await fetchAllProjectSlugs(); // Implement your data fetching logic

//   return slugs.map((slug) => ({
//     params: { slug },
//   }));
// }

const SinglePost = () => {
  const router = useRouter();
  const setProject = useCrudData((store) => store.updateProject);
  // global project data
  const project = useCrudData((store) => store.project);

  // function to update the form state if it is add/edit
  const updateProjectFormState = useCrudData(
    (state) => state.updateProjectFormState
  );
  const updateProjectFormPopup = useCrudData(
    (state) => state.updateProjectFormPopup
  );

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

  const [pageData, setPageData] = useState("");

  useEffect(() => {
    console.log("use state called for single post");
    const fetchSingleProject = async () => {
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

          setPageData(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleProject();
  }, [project]);

  const handleEdit = async () => {
    console.log("edit called");
    updateProjectFormState(false);
    updateProjectFormPopup(true);
  };

  const handleDelete = async () => {
    const response = await fetch(
      `${backendURI}/admin/data/project/delete/${params.slug}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();

      updatePopupContent(data.message);
      updatePopupStatusForm(data.status);
      updateSuccessMessageIcon(data.status);
      router.push("/admin/projects");
    }
  };
  console.log(pageData);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
      {pageData && pageData ? (
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden border-2 border-primary">
          {/* Header */}
          <div className=" px-6 py-2">
            <h4 className="text-sm text-white uppercase tracking-wide ">
              #{pageData.order}
            </h4>
            <h1 className="text-3xl font-bold  mt-2 border-b-2 border-colorText/40 pb-2 uppercase">
              {pageData.heading}
            </h1>
          </div>

          {/* Content */}
          <div className="px-6 py-2">
            <p className="  mb-6">{pageData.description}</p>
            {/* image  */}
            <p className="font-semibold text-xl capitalize border-b-colorText/10 border-b-2 pb-2">
              Tech Stack Used
            </p>
            <div className="grid grid-cols-5 my-2  gap-2">
              {pageData.techImgName.map((e, i) => {
                return <TechCard imageName={e} key={pageData.techUsed[i]} />;
              })}
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6 mb-6">
              {pageData.liveLink ? (
                <Link
                  href={pageData.liveLink}
                  className="text-sm font-medium underline"
                >
                  View Live
                </Link>
              ) : null}
              {pageData.projectLink ? (
                <Link
                  href={pageData.projectLink}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
                >
                  View Code
                </Link>
              ) : null}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <CrudBtn
                bgColor={"#54AF52"}
                text={<CiEdit />}
                handleButton={handleEdit}
              />
              <CrudBtn
                bgColor={"#D74C48"}
                text={<MdDeleteForever />}
                handleButton={handleDelete}
              />
            </div>
          </div>
        </div>
      ) : (
        <Shimmer height={"15rem"} width={"50rem"} radius={"1rem"} />
      )}
    </div>
  );
};

export default SinglePost;
