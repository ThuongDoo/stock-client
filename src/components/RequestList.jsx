import React, { useState } from "react";
import CreateUser from "./CreateUser";

function RequestList({ requestList, onCreateUser }) {
  const handleCreateUser = (value) => {
    onCreateUser(value);
  };
  return (
    <div className="  ">
      <h1>Danh sach yeu cau</h1>
      <table className=" w-full">
        <thead>
          <tr>
            <th>sdt</th>
            <th>email</th>
            <th>name</th>
            <th>noi dung yeu cau</th>
          </tr>
        </thead>
        <tbody>
          {requestList?.map((request, index) => (
            <tr key={index}>
              <td>{request.phone}</td>
              <td>{request.email}</td>
              <td>{request.name}</td>
              <td>{request.content}</td>
              <td>
                <button>Delete</button>
              </td>
              <td>
                <button onClick={() => handleCreateUser(request)}>
                  Create User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;
