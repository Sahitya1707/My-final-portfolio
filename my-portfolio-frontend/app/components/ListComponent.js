import Link from "next/link";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Icon from "./CrudIcon";
import { backendURI } from "../utils/secret";
import { useCrudData } from "../utils/stores/crudData";
import { useMenuPopup } from "../utils/stores/menuPopup";

const ListComponent = ({ text, link, id }) => {
  const setMenuData = useCrudData((state) => state.updateMenu);
  const setPopupActive = useMenuPopup((state) => state.updatePopupActive);
  // const setPopupActive = useCrudData((state) => state.updatePopupActive);
  const setMenuHeading = useMenuPopup((state) => state.updateMenuHeading);
  const setAddMenuState = useMenuPopup((state) => state.updateAddMenuState);
  const setEditId = useMenuPopup((state) => state.updateEditId);
  const handleDelete = async (id) => {
    // console.log(id);

    try {
      const response = await fetch(
        `${backendURI}/admin/data/menu/delete/${id}`,
        {
          method: "Delete",
          credentials: "include",
        }
      );
      console.log(response);
      const data = await response.json();
      setMenuData(data.data);
    } catch (err) {}
  };
  const handleEdit = async (id) => {
    console.log("handle edit called");
    setPopupActive(true);
    setMenuHeading("Edit Menu");
    setAddMenuState(false);
    setEditId(id);

    try {
    } catch (err) {}
  };
  return (
    <li className="flex items-center justify-between   p-2 rounded-lg  my-2 border-2 border-colorText/10 bg-colorNav">
      <p>
        {`${text}  `}(
        <Link href={`${link}`} target="_blank" className="text-primary">
          {link}
        </Link>
        )
      </p>
      <p className="flex items-center gap-x-2">
        <Icon
          icon={<MdDelete />}
          color={"red"}
          handleButton={handleDelete}
          id={id}
        />
        <Icon
          icon={<FaEdit />}
          color={"green"}
          handleButton={handleEdit}
          id={id}
        />
      </p>
    </li>
  );
};

export default ListComponent;
