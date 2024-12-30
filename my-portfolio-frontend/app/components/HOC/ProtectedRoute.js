import { backendURI } from "@/app/utils/secret";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginStatus } from "@/app/utils/stores/login";

const ProtectedRoute = (Wrapper) => {
  const setAdminLoginStatus = useLoginStatus((store) => store.updateAdminLogin);
  const newComponent = (props) => {
    const router = useRouter();
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const authResponse = await fetch(`${backendURI}/admin/verify`, {
            method: "GET",
            credentials: "include",
          });
          console.log(authResponse);
          if (!authResponse.ok) {
            router.push("/admin/login");
          }
        } catch (err) {
          // add some auth like need login using global state management.

          router.push("/admin/login");
        }
      };
      checkAuth();
    }, [router]);
    return (
      <div>
        <Wrapper {...props} />
      </div>
    );
  };
  return newComponent;
};

export default ProtectedRoute;
