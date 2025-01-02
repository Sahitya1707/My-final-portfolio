"use client";
import React, { useEffect } from "react";
import { backendURI } from "../utils/secret";
import { useCrudData } from "../utils/stores/crudData";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import ListComponent from "./ListComponent";
import Shimmer from "./Shimmer";
import Dashboard from "./Dashboard";
import DashboardSecondHeading from "./DashboardSecondHeading";

const MenuComponent = () => {
  // shimmer menu list
  const shimmerMenuList = [];

  // -------------------
  const menuData = useCrudData((state) => state.menu);
  const setMenuData = useCrudData((state) => state.updateMenu);
  // const refreshMenu = useCrudData((state = state.refreshMenu));
  const getMenu = async () => {
    try {
      const response = await fetch(`${backendURI}/admin/data/getAllMenu`, {
        method: "GET",
        headers: {},
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      // if (JSON.stringify(menuData) !== JSON.stringify(data)) {
      //   setMenuData(data);
      // }
      setMenuData(data.data);
      console.log(menuData);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(menuData);
  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="border-b-2 border-colorText/10 pb-6">
      <DashboardSecondHeading text={"Menus"} />
      <ul className="pl-4 w-[50%] mt-2 border-solid p-2 border-2 rounded-lg">
        {menuData && menuData
          ? menuData.map((e, i) => {
              return (
                <ListComponent
                  text={e.menuName}
                  link={e.menuLink}
                  key={e._id}
                  id={e._id}
                />
              );
            })
          : Array(5)
              .fill(0)
              .map((e, i) => {
                return (
                  <Shimmer
                    key={i}
                    height={"3rem"}
                    radius={"6px"}
                    width={"100%"}
                    margin={"5px 0px 0px 0px"}
                  />
                );
              })}
      </ul>
    </div>
  );
};

export default MenuComponent;
