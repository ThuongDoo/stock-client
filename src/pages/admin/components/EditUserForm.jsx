import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("*Email không hợp lệ")
    .required("*Vui lòng nhập email"),
  phone: Yup.string().required("*Vui lòng nhâp số điện thoại"),
});

const EditUserForm = ({ userData, onSubmit }) => {
  console.log(userData);
  initialValues.email = userData.email;
  initialValues.name = userData.name;
  initialValues.phone = userData.phone;
  const handleSubmit = (values, { setSubmitting }) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    console.log(values);
    values.role = "stock1";
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
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="phone">Phone</label>
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
            <label htmlFor="date">Thêm ngày</label>
            <Field as="select" id="date" name="date">
              <option value="">Thêm ngày</option>
              <option value="15">Stock1</option>
              <option value="30">Stock2</option>
              <option value="178">Stock3</option>
              <option value="365">Stock4</option>
            </Field>
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-yellow-500 rounded-full px-4 py-2 w-full text-white font-extrabold"
          >
            EDIT
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
