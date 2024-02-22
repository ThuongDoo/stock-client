import React from "react";
import EditUserForm from "./forms/EditUserForm";

function EditUser({ userData }) {
  return (
    <div>
      EditUser
      <EditUserForm userData={userData} />
    </div>
  );
}

export default EditUser;
