import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  // name: Yup.string().required("*Vui lòng nhập họ và tên"),
  // email: Yup.string()
  //   .email("*Email không hợp lệ")
  //   .required("*Vui lòng nhập email"),
  // phone: Yup.string().required("*Vui lòng nhâp số điện thoại"),
});

const Analysis = ({ filters, onSubmit }) => {
  const initialValues = filters.reduce((acc, curr) => {
    acc[curr.name] = false; // Giá trị "hoho" có thể được thay đổi tùy ý
    return acc;
  }, {});
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
      {({ isSubmitting, setFieldValue }) => (
        <Form className="  text-black  overflow-scroll">
          <div className="  grid grid-cols-2 ">
            {filters.map((box, index) => (
              <label className=" flex gap-x-2" key={index}>
                <Field
                  type="checkbox"
                  name={box.name}
                  onChange={(e) => {
                    setFieldValue(box.name, e.target.checked);
                    // submitForm();
                  }}
                />
                {box.displayName}
              </label>
            ))}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Analysis;
