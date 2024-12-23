"use client";
import { usePathname } from "next/navigation";
import Dashboard from "../components/Dashboard";
import { useEffect } from "react";
import { useActiveNav } from "../utils/stores/activeNav";
import DashboardPopup from "../components/DashboardPopup";
import { useDashboardPopup } from "../utils/stores/dashboardPopup";
// import Dashboard from "";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const popupDashboard = useDashboardPopup((state) => state.popupActive);
  const updateActiveDashboard = useActiveNav(
    (state) => state.updateActiveDashboard
  );
  useEffect(() => {
    if (pathname === "/admin/dashboard") {
      updateActiveDashboard(0);
    } else if (pathname === "/admin/pages") {
      updateActiveDashboard(1);
    } else if (pathname === "/admin/projects") {
      updateActiveDashboard(2);
    } else {
      updateActiveDashboard(0);
    }
  }, [pathname]);
  console.log(pathname);
  return (
    <>
      {pathname && pathname.includes("/login") ? (
        <> {children} </>
      ) : (
        <>
          <div className="relative">
            {popupDashboard ? <DashboardPopup /> : null}

            <div className="fixed  left-0 top-0 bottom-0 bg-primary w-[15rem] shadow-sm shadow-colorText p-4 h-[100vh]">
              <Dashboard />
            </div>

            <div className="pl-[20rem] text-colorText py-5">{children}</div>
          </div>{" "}
        </>
      )}
    </>
  );
}
