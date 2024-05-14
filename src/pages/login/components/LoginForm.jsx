import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../utils/api";
import { useDispatch } from "react-redux";
import { login } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  phone: Yup.string().required("Vui lòng nhập số điện thoại"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values, actions) => {
    // Xử lý đăng nhập ở đây
    console.log("Đăng nhập với:", values);
    await api
      .post("/user/login", { phone: values.phone, password: values.password })
      .then((res) => {
        console.log(res.data);

        // dispatch(login({username:}));
        navigate("/");
      })
      .catch((err) => setError("Sai thông tin đăng nhập"));
    dispatch(login());
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
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
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
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="******************"
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
                className="text-red-500 text-xs italic"
              />
            </div>

            {error && <h1 className="text-red-500 text-xs italic">{error}</h1>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Đăng nhập
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
