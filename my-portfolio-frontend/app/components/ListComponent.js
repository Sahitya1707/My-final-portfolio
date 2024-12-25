import Link from "next/link";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Icon from "./CrudIcon";

const ListComponent = ({ text, link, id }) => {
  const handleDelete = (id) => {
    console.log(id);
  };
  const handleEdit = (id) => {
    console.log(id);
  };
  return (
    <li className="flex items-center justify-between   p-2 rounded-lg  my-2 border-2 border-colorText/10">
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
