import React from "react";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import { login } from "../slices/userSlice";
import LoginForm from "../components/forms/LoginForm";

function Login() {
  const dispatch = useDispatch();
  const handleLogin = async () => {
    await api
      .post("/user/login", { phone: 1234, password: "123456" })
      .then((res) => {
        console.log(res.data);

        dispatch(login());
      })
      .catch((err) => console.log(err));
    // dispatch(login());
  };
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
