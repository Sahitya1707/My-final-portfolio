import React, { useEffect } from "react";
import { backendURI } from "../utils/secret";
import { useCrudData } from "../utils/stores/crudData";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import ListComponent from "./ListComponent";

const MenuComponent = () => {
  const menuData = useCrudData((state) => state.menu);
  const setMenuData = useCrudData((state) => state.updateMenu);
  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await fetch(`${backendURI}/admin/data/getAllMenu`, {
          method: "GET",
          headers: {},
        });
        if (response.ok) {
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getMenu();
  }, [menuData]);

  return (
    <div>
      {menuData && (
        <>
          <p className="text-xl uppercase ">All Menus</p>

          {menuData && (
            <ul className="pl-4 w-[50%] mt-2 border-solid p-2 border-2 rounded-lg">
              {menuData &&
                menuData.map((e, i) => {
                  return (
                    <ListComponent
                      text={e.menuName}
                      link={e.menuLink}
                      key={e._id}
                      id={e._id}
                    />
                  );
                })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default MenuComponent;
