import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  // name: Yup.string().required("*Vui lòng nhập họ và tên"),
  // email: Yup.string()
  //   .email("*Email không hợp lệ")
  //   .required("*Vui lòng nhập email"),
  // phone: Yup.string().required("*Vui lòng nhâp số điện thoại"),
});

const LocCoPhieuForm = ({ data, onSubmit, checkedValues }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Xử lý dữ liệu khi biểu mẫu được gửi đi
    // setFormInitialValues(values);
    onSubmit(values);
    setSubmitting(false);
    // resetForm();
  };
  return (
    <Formik
      initialValues={{ checked: checkedValues }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
    >
      {({ submitForm, handleChange }) => (
        <Form className="    ">
          {data.map((group) => (
            <div key={group.group} className=" p-3 space-y-2">
              <h3 className=" text-left  font-bold text-sm">{group.group}</h3>
              <div className=" grid grid-cols-3 dark:bg-slate-700 bg-white  p-4 gap-y-4 rounded-lg">
                {group.filter.map((filter) => (
                  <label
                    key={filter.name}
                    className="text-left flex gap-x-1 items-center"
                  >
                    <Field
                      type="checkbox"
                      name="checked"
                      value={filter.name}
                      onChange={(e) => {
                        handleChange(e);
                        submitForm();
                      }}
                    />
                    <h1 className=" text-sm">{filter.displayName}</h1>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
};

export default LocCoPhieuForm;
