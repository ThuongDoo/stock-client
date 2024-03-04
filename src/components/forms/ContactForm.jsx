import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  content: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("*Vui lòng nhập họ và tên"),
  email: Yup.string()
    .email("*Email không hợp lệ")
    .required("*Vui lòng nhập email"),
  phone: Yup.string().required("*Vui lòng nhâp số điện thoại"),
});

const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    onSubmit(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
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
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Nội dung/Yêu cầu"
              className="rounded-3xl px-4 py-2 w-full h-40"
            />
            <ErrorMessage
              name="content"
              component="div"
              className=" text-red-500 font-extrabold"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-orange-600 rounded-full px-4 py-2 w-full text-white font-extrabold"
            onClick={() => alert("yêu cầu đã được gửi")}
          >
            GỬI LIÊN HỆ NGAY
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
