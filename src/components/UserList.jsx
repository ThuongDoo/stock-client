import { format } from "date-fns";
import moment from "moment";
import React from "react";
import api from "../utils/api";
import CustomTable from "./CustomTable";

function UserList({ userList, onEdit }) {
  const data = userList.map((item) => {
    const expirationDate = moment(item.expirationDate);
    const daysRemaining = expirationDate.diff(moment(), "days");
    const expirationText =
      daysRemaining >= 0
        ? `${daysRemaining} ngày`
        : isNaN(daysRemaining)
        ? "null"
        : "Đã hết hạn";
    let expirationDateDisplay;
    if (item.expirationDate === null) {
      expirationDateDisplay = "null";
    } else {
      expirationDateDisplay = format(
        new Date(item.expirationDate),
        "dd-MM-yyyy HH:mm:ss"
      );
    }
    return { ...item, expirationDate: expirationDateDisplay, expirationText };
  });
  console.log(data);
  const handleEdit = (value) => {
    onEdit(value);
  };

  const handleDelete = async (value) => {
    console.log(value);
    await api
      .delete(`/user/deleteUser/${value}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleReset = async (value) => {
    console.log(value);
    await api
      .patch(`user/resetPassword/${value}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      field: "name",
      headerName: "Username",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "role",
      headerName: "ROle",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "expirationDate",
      headerName: "Expiration date",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "expirationText",
      headerName: "Expiration date",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
  ];
  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <table className=" w-full">
        <thead>
          <tr>
            <th>Username</th>
            {/* <th>Password</th> */}
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Role</th>
            <th>Ngày hết hạn</th>
            <th>Thời gian còn lại</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => {
            const expirationDate = moment(user.expirationDate);
            const daysRemaining = expirationDate.diff(moment(), "days");
            const expirationText =
              daysRemaining >= 0
                ? `${daysRemaining} ngày`
                : isNaN(daysRemaining)
                ? "null"
                : "Đã hết hạn";
            return (
              <tr key={index}>
                <td>{user.name}</td>
                {/* <td>{user.password}</td> */}
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  {user.expirationDate === null
                    ? "null"
                    : format(
                        new Date(user.expirationDate),
                        "dd-MM-yyyy HH:mm:ss"
                      )}
                </td>
                <td>{expirationText}</td>
                <td
                  onClick={() => handleDelete(user.phone)}
                  className=" cursor-pointer"
                >
                  Delete
                </td>
                <td
                  className=" cursor-pointer"
                  onClick={() => handleReset(user.phone)}
                >
                  ResetPass
                </td>

                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    // <div>
    //   <CustomTable columns={columns} rows={data} />
    // </div>
  );
}

export default UserList;
