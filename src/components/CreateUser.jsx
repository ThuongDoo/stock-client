import React from "react";
import CreateUserForm from "./forms/CreateUserForm";
import api from "../utils/api";

function CreateUser({ userData }) {
  const handleCreateUser = async (values) => {
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
