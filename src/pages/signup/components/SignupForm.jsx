import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api, { endpoints } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { STRINGS } from "../../../constants/strings";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại không vượt quá 11 chữ số"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  name: Yup.string()
    .required("Vui lòng nhập tên")
    .min(2, "Tên phải có ít nhất 2 ký tự"),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (values, actions) => {
    // Xử lý đăng nhập ở đây
    await api
      .post(endpoints.SIGNUP, values)
      .then((res) => {
        setError(null);

        navigate("/verify");
      })
      .catch((err) => {
        console.log(err);
        setError("Số điện thoại hoặc email đã tồn tại");
      });
    actions.setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded-3xl px-8 py-12 text-black flex flex-col gap-y-5 w-96">
            <h1 className=" text-3xl font-semibold">{STRINGS.REGISTER}</h1>
            <div className=" space-y-5">
              <div className=" h-10 ">
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Số điện thoại"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-xs italic text-left"
                />
              </div>
              <div className=" h-10 ">
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs italic text-left"
                />
              </div>
              <div className=" h-10 ">
                <Field
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-xs italic text-left"
                />
              </div>

              <div className=" h-10 ">
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Mật khẩu"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent text-gray-700 font-semibold"
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs italic text-left"
                />
              </div>
              <div className=" h-10 ">
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="rePassword"
                    placeholder="Nhập lại mật khẩu"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent text-gray-700 font-semibold"
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
                <ErrorMessage
                  name="rePassword"
                  component="p"
                  className="text-red-500 text-xs italic text-left"
                />
              </div>
            </div>

            {error && <h1 className="text-red-500 text-xs italic">{error}</h1>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {STRINGS.REGISTER}
            </button>
            <div className=" text-sm">
              <span>{STRINGS.HAVE_ACCOUNT} </span>
              <span
                className=" cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => navigate("/login")}
              >
                {STRINGS.LOGIN}
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
