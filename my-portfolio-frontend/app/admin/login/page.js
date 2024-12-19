"use client";
import { ProjectHeading } from "@/app/components/ProjectComponent";

import handleLogin from "../../actions/login";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Input } from "@/app/components/Form";
import ButtonTypeOne from "@/app/components/ButtonTypeOne";
import { useState } from "react";
import { Icon } from "@/app/components/Header";

const Login = () => {
  const [showPassword, setShowPassword] = useState("password");
  const handlePasswordClickIcon = () => {
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };
  return (
    <div className="text-center h-[100vh] w-[40%] max-w-[35rem] mx-auto flex flex-col justify-center">
      <div className="border-primary border-solid border-2 p-6 rounded-lg">
        {" "}
        <ProjectHeading text={"Admin Login"} />
        <form action={handleLogin} className="text-left flex flex-col gap-y-2">
          <Input
            inputRequired={true}
            inputType={"email"}
            label={"email"}
            placeholderText={"Enter your mail."}
          />
          <div className="relative">
            <Input
              inputRequired={true}
              inputType={showPassword}
              label={"password"}
              placeholderText={"Enter your mail."}
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

export default Login;
