import { format } from "date-fns";
import moment from "moment";
import React from "react";

function UserList({ userList, onEdit }) {
  const handleEdit = (value) => {
    onEdit(value);
  };
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
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
