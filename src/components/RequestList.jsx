import React, { useState } from "react";
import CreateUser from "./CreateUser";

function RequestList({ requestList, onCreateUser }) {
  const [selectedBoxs, setSelectedBoxs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleCreateUser = (value) => {
    onCreateUser(value);
  };

  const handleToggleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  const handleToggleSelect = (id) => {
    const updatedSelectedBoxs = [...selectedBoxs];
    if (updatedSelectedBoxs.includes(id)) {
      const boxIndex = updatedSelectedBoxs.findIndex((box) => box === id);
      updatedSelectedBoxs.splice(boxIndex, 1);
    } else {
      updatedSelectedBoxs.push(id);
    }
    setSelectedBoxs(updatedSelectedBoxs);
  };

  console.log(selectedBoxs);
  return (
    <div className="  ">
      <h1>Danh sach yeu cau</h1>
      <table className=" w-full">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>sdt</th>
            <th>email</th>
            <th>name</th>
            <th>noi dung yeu cau</th>
          </tr>
        </thead>
        <tbody>
          {requestList?.map((request) => (
            <tr key={request.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleToggleSelect(request.id)}
                  checked={selectedBoxs.includes(request.id)}
                />
              </td>
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
