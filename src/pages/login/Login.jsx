import React from "react";
import Header from "../../components/Header";
import LoginForm from "./components/LoginForm";

function Login() {
  return (
    <div className=" flex h-screen justify-center">
      <div className=" px-8 pb-4 absolute w-full z-50">
        <Header />
      </div>
      <div className="  flex items-center justify-center">
        <div className=" ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
