import React from "react";
import api from "../../../utils/api";
import CreateUserForm from "../requestManager/CreateUserForm";

function CreateUser({ userData }) {
  const handleCreateUser = async (values) => {
    values.date = Number(values.date);
    // console.log(values);
    await api
      .post("/user", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      CreateUser
      <CreateUserForm userData={userData} onSubmit={handleCreateUser} />
    </div>
  );
}

export default CreateUser;
