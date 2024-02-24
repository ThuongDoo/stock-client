import React, { useEffect, useState } from "react";
import CreateUser from "./CreateUser";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../utils/api";

function RequestList({ requestList, onCreateUser, onChange }) {
  const [selectedBoxs, setSelectedBoxs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);
  const handleCreateUser = (value) => {
    onCreateUser(value);
  };

  const handleDelete = async () => {
    const selectedRequests = selectedBoxs.map(
      (selectedIndex) => requestList[selectedIndex]
    );
    const selectedRequestIds = selectedRequests.map((request) => request.id);
    console.log(selectedRequestIds);
    const idsString = selectedRequestIds.join(",");

    await api
      .delete(`/user/userRequest/${idsString}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    onChange(true);
    setSelectedBoxs([]);
  };

  const handleToggleSelectAll = () => {
    const updatedSelectedBoxs = [];
    if (selectAll === false) {
      for (let i = 0; i < requestList.length; i++) {
        updatedSelectedBoxs.push(i);
      }
    }
    setSelectAll(!selectAll);
    setSelectedBoxs(updatedSelectedBoxs);
  };
  const handleToggleSelect = (index) => {
    const updatedSelectedBoxs = [...selectedBoxs];
    if (shiftPressed && lastCheck != null) {
      console.log("shift");
      if (lastCheck < index) {
        for (let i = lastCheck; i <= index; i++) {
          if (!updatedSelectedBoxs.includes(i)) {
            updatedSelectedBoxs.push(i);
          }
        }
      } else {
        for (let i = index; i <= lastCheck; i++) {
          if (!updatedSelectedBoxs.includes(i)) {
            updatedSelectedBoxs.push(i);
          }
        }
      }
    } else {
      if (updatedSelectedBoxs.includes(index)) {
        const boxIndex = updatedSelectedBoxs.findIndex((box) => box === index);
        updatedSelectedBoxs.splice(boxIndex, 1);
      } else {
        updatedSelectedBoxs.push(index);
      }
    }
    setSelectedBoxs(updatedSelectedBoxs);
    setLastCheck(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey) {
        setShiftPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (!e.shiftKey) {
        setShiftPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="  ">
      <h1>Danh sach yeu cau</h1>
      <div className=" flex justify-start">
        <div
          className=" flex cursor-pointer hover:bg-blue-500 rounded-full p-1"
          onClick={() => handleDelete()}
        >
          <DeleteIcon sx={{ color: "white", fontSize: 20 }} />
        </div>
      </div>
      <table className=" w-full border-collapse border border-slate-700">
        <thead>
          <tr className="border-b border-slate-700">
            <th className=" px-2 border-r border-slate-700">
              <input
                type="checkbox"
                onChange={() => handleToggleSelectAll()}
                checked={selectAll}
              />
            </th>
            <th className=" px-2  border-r border-slate-700">sdt</th>
            <th className=" px-2  border-r border-slate-700">email</th>
            <th className=" px-2  border-r border-slate-700">name</th>
            <th className=" w-1/3 px-2  border-r border-slate-700">
              noi dung yeu cau
            </th>
          </tr>
        </thead>
        <tbody>
          {requestList?.map((request, index) => (
            <tr key={index} className=" border-b border-slate-700">
              <td className=" border-r border-slate-700">
                <input
                  type="checkbox"
                  onChange={() => handleToggleSelect(index)}
                  checked={selectedBoxs.includes(index)}
                />
              </td>
              <td className=" border-r border-slate-700">{request.phone}</td>
              <td className=" border-r border-slate-700">{request.email}</td>
              <td className=" border-r border-slate-700">{request.name}</td>
              <td className=" border-r border-slate-700">{request.content}</td>
              <td className=" border-r border-slate-700">
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
