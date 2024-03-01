import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  password: "",
  email: "",
  phone: "",
  role: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("*Email không hợp lệ")
    .required("*Vui lòng nhập email"),
  phone: Yup.string().required("*Vui lòng nhâp số điện thoại"),
});

const EditUserForm = ({ userData }) => {
  console.log(userData);
  initialValues.email = userData.email;
  initialValues.name = userData.name;
  initialValues.phone = userData.phone;
  initialValues.password = userData.password;
  const handleSubmit = (values, { setSubmitting }) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    console.log(values);
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
            <Field
              id="password"
              name="password"
              placeholder="Số điện thoại"
              className="rounded-full px-4 py-2 w-full"
            />
            <ErrorMessage
              name="password"
              component="div"
              className=" text-red-500 font-extrabold"
            />
          </div>
          <div className=" flex flex-col items-start">
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
          <div className=" flex flex-col items-start">
            <Field as="select" id="selectedOption" name="selectedOption">
              <option value="">Role</option>
              <option value="option1">Stock1</option>
              <option value="option2">Stock2</option>
              <option value="option3">Stock3</option>
            </Field>
            <ErrorMessage
              name="selectedOption"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-yellow-500 rounded-full px-4 py-2 w-full text-white font-extrabold"
          >
            CREATE
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;