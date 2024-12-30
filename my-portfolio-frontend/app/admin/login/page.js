"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { ProjectHeading } from "@/app/components/ProjectComponent";

import handleLogin from "../../actions/login";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Input } from "@/app/components/Form";
import ButtonTypeOne from "@/app/components/ButtonTypeOne";
import { useState, useEffect } from "react";
import { Icon } from "@/app/components/Header";
import { backendURI } from "@/app/utils/secret";
import ProtectedRoute from "@/app/components/HOC/ProtectedRoute";
import { useLoginStatus } from "@/app/utils/stores/login";

const Login = () => {
  const setAdminLoginStatus = useLoginStatus((store) => store.updateAdminLogin);
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlePasswordClickIcon = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  // console.log(formData);
  const handleInput = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [`${e.target.name}`]: e.target.value,
    });
  };
  // -------------------
  async function handleLogin(e) {
    e.preventDefault();
    console.log(formData);

    // console.log(formData.get("password"));
    try {
      // const formData = new FormData(e.currentTarget);
      // console.log(e.currentTarget);
      const response = await fetch(`${backendURI}/admin/login`, {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setAdminLoginStatus(true);
        push("/admin/dashboard");
      }
    } catch (err) {
      console.log("err", err);
    }
    // e.preventDefault();
    // why not use State for form
    // https://medium.com/@TheKalpit/stop-using-usestate-for-form-data-ce5cc9a4ce93
  }

  // running the useEffect once to check if there is token or not
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authResponse = await fetch(`${backendURI}/admin/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (authResponse.ok) {
          push("/admin/dashboard");
          setAdminLoginStatus(true);
        }
        if (!authResponse.ok) {
          console.log("not okay");
          push("/admin/login");
          setAdminLoginStatus(false);
        }
      } catch (err) {
        console.log(err);
        // add some auth like need login using global state management.

        push("/admin/login");
      }
    };
    checkAuth();
  }, []);
  return (
    <div className="text-center h-[100vh] w-[40%] max-w-[35rem] mx-auto flex flex-col justify-center  ">
      <div className="border-primary border-solid border-2 p-6 rounded-lg shadow-lg shadow-colorText/40">
        {}
        <ProjectHeading text={"Admin Login"} />
        <form
          // action="http://localhost:5002/login"
          onSubmit={handleLogin}
          method="POST"
          className="text-left flex flex-col gap-y-2"
        >
          <Input
            inputRequired={true}
            inputType={"email"}
            label={"email"}
            placeholderText={"Enter your mail."}
            handleInput={handleInput}
          />
          <div className="relative">
            <Input
              inputRequired={true}
              inputType={showPassword}
              label={"password"}
              placeholderText={"Enter your password."}
              handleInput={handleInput}
            />
            <div className="absolute right-5 top-[2rem] text-colorNav">
              {showPassword === "text" ? (
                <Icon icon={<FaEye />} handleClick={handlePasswordClickIcon} />
              ) : (
                <Icon
                  icon={<FaEyeSlash />}
                  handleClick={handlePasswordClickIcon}
                />
              )}
            </div>
          </div>

          <ButtonTypeOne
            password={"login"}
            bgColor={"primary"}
            color={"colorText"}
            btnType={"submit"}
            text={"Login"}
          />
        </form>
      </div>
    </div>
  );
};

export default ProtectedRoute(Login);
