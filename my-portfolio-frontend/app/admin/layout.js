"use client";
import { usePathname } from "next/navigation";
import Dashboard from "./dashboard/page";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {pathname && pathname.includes("/login") ? (
        <> {children} </>
      ) : (
        <div>
          <Dashboard />
          <div>{children}</div>
        </div>
      )}
    </>
  );
}
