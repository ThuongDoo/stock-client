import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { STRINGS } from "../../../constants/strings";

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

const validationSchema = Yup.object({
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại không vượt quá 11 chữ số"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  name: Yup.string()
    .required("Vui lòng nhập tên")
    .min(2, "Tên phải có ít nhất 2 ký tự"),
});

const CreateUserForm = ({ userData, onSubmit }) => {
  if (userData) {
    initialValues.email = userData.email;
    initialValues.name = userData.name;
    initialValues.phone = userData.phone;
  }
  const handleSubmit = (values, { setSubmitting }) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    onSubmit(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className=" flex flex-col h-full justify-between text-black gap-y-5">
          <div className=" flex flex-col items-start">
            <label htmlFor="name" className=" text-white font-bold mb-1">
              {STRINGS.NAME}
            </label>
            <Field
              type="name"
              id="name"
              name="name"
              placeholder="Họ và tên"
              className="rounded-full px-4 py-2 w-full"
            />
            <ErrorMessage
              name="name"
              component="div"
              className=" text-red-500 font-extrabold"
            />
          </div>
          <div className=" flex flex-col items-start">
            <label htmlFor="email" className=" text-white font-bold mb-1">
              {STRINGS.EMAIL}
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="rounded-full px-4 py-2 w-full"
            />
            <ErrorMessage
              name="email"
              component="div"
              className=" text-red-500 font-extrabold"
            />
          </div>
          <div className=" flex flex-col items-start">
            <label htmlFor="phone" className=" text-white font-bold mb-1">
              {STRINGS.PHONE}
            </label>
            <Field
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              className="rounded-full px-4 py-2 w-full"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className=" text-red-500 font-extrabold"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
          >
            CREATE
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUserForm;
