import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { STRINGS } from "../../../constants/strings";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  roles: "STOCK1",
  date: STRINGS.STOCK1_DATE,
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("*Email không hợp lệ")
    .required("*Vui lòng nhập email"),
  phone: Yup.string().required("*Vui lòng nhâp số điện thoại"),
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
          <div className=" flex flex-col items-start">
            <label htmlFor="date" className=" text-white font-bold mb-1">
              {STRINGS.ROLE}
            </label>
            <Field as="select" id="date" name="date">
              <option value="" disabled>
                Role
              </option>
              <option value={STRINGS.STOCK1_DATE}>Stock1</option>
              <option value={STRINGS.STOCK2_DATE}>Stock2</option>
              <option value={STRINGS.STOCK3_DATE}>Stock3</option>
              <option value={STRINGS.STOCK4_DATE}>Stock4</option>
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
