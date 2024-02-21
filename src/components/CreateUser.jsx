import React from "react";
import CreateUserForm from "./CreateUserForm";

function CreateUser({ userData }) {
  return (
    <div>
      CreateUser
      <CreateUserForm userData={userData} />
    </div>
  );
}

export default CreateUser;
