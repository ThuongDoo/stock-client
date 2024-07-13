import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../../utils/api";
import { STRINGS } from "../../../constants/strings";

const initialValues = {
  phone: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  phone: Yup.string().required("*Vui lòng nhập phone"),
  password: Yup.string().required("*Vui lòng nhập mật khẩu cũ"),
  newPassword: Yup.string().required("*Vui lòng nhập mật khẩu mới"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "*Mật khẩu không khớp")
    .required("*Vui lòng nhập lại mật khẩu"),
});

const ResetPasswordForm = ({ phone }) => {
  const [err, setErr] = useState(false);
  initialValues.phone = phone;
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    await api
      .patch("/user/changePassword", {
        phone: values.phone,
        confirmPassword: values.password,
        newPassword: values.newPassword,
      })
      .then((res) => {
        setErr(false);
        alert("thay doi mat khau thanh cong");
      })
      .catch((err) => setErr(true));
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className=" flex flex-col h-full justify-between text-black gap-y-5 bg-white rounded-xl">
          <h1 className=" text-3xl border-b bg-blue-100 rounded-xl text-left px-4 py-2">
            {STRINGS.CHANGE_PASSWORD}
          </h1>
          <div className=" flex flex-col justify-between items-center gap-y-5 p-10">
            <div className=" flex flex-col items-start">
              <label className="  font-semibold" htmlFor="password">
                Nhập mật khẩu cũ
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Mật khẩu"
                className="rounded-full px-4 py-2 w-full bg-blue-100"
              />
              <ErrorMessage
                name="password"
                component="div"
                className=" text-red-500 font-extrabold"
              />
            </div>
            <div className=" flex flex-col items-start">
              <label className="  font-semibold" htmlFor="newPassword">
                Nhập mật khẩu mới
              </label>
              <Field
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Nhập mật khẩu mới"
                className="rounded-full px-4 py-2 w-full bg-blue-100"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className=" text-red-500 font-extrabold"
              />
            </div>
            <div className=" flex flex-col items-start">
              <label className="  font-semibold" htmlFor="confirmPassword">
                Xác nhận mật khẩu
              </label>

              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="rounded-full px-4 py-2 w-full bg-blue-100"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className=" text-red-500 font-extrabold"
              />
            </div>
            <h1
              className={`${
                err ? "block" : "hidden"
              } text-red-500 font-extrabold`}
            >
              *Mật khẩu không trùng khớp
            </h1>
            <button
              type="submit"
              disabled={isSubmitting}
              className=" bg-blue-300 rounded-full px-4 py-2 w-full hover:bg-blue-200   font-extrabold"
            >
              Thay đổi mật khẩu
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
