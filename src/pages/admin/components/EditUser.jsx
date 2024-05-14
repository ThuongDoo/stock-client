import React from "react";
import api from "../../../utils/api";
import EditUserForm from "./EditUserForm";

function EditUser({ userData }) {
  const handleSubmit = async (values) => {
    values.date = Number(values.date);
    console.log(values);
    await api
      .patch("/user/updateUser", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      EditUser
      <EditUserForm userData={userData} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditUser;
