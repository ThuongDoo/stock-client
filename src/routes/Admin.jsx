import React, { useState } from "react";
import Header from "../components/Header";
import UserList from "../components/UserList";
import RequestList from "../components/RequestList";
import CreateUser from "../components/CreateUser";
import CloseIcon from "@mui/icons-material/Close";
import EditUser from "../components/EditUser";

function Admin() {
  const [activeTab, setActiveTab] = useState("users");
  const [createUser, setCreateUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const userList = [
    {
      name: "user1",
      password: "password1",
      email: "user1@example.com",
      phone: "1234567890",
      expirationDate: "2024-12-31",
      role: "Stock1",
    },
    {
      name: "user2",
      password: "password2",
      email: "user2@example.com",
      phone: "0987654321",
      expirationDate: "2024-11-30",
      role: "Stock2",
    },
    {
      name: "user3",
      password: "password2",
      email: "user2@example.com",
      phone: "0987654321",
      expirationDate: "2024-11-30",
      role: "Stock2",
    },
    {
      name: "user4",
      password: "password2",
      email: "user2@example.com",
      phone: "0987654321",
      expirationDate: "2024-11-30",
      role: "Stock2",
    },
    {
      name: "user5",
      password: "password2",
      email: "user2@example.com",
      phone: "0987654321",
      expirationDate: "2024-11-30",
      role: "Stock2",
    },
    {
      name: "user6",
      password: "password2",
      email: "user2@example.com",
      phone: "0987654321",
      expirationDate: "2024-11-30",
      role: "Stock2",
    },
  ];

  const handleCreateUser = (value) => {
    setCreateUser(value);
  };

  const handleEditUser = (value) => {
    setEditUser(value);
  };

  const requestList = [
    {
      phone: "0123456",
      email: "dfa@gmail.com",
      name: "nguyen van a",
      content: "ghjkjdahgkhkfsdafs",
    },
    {
      phone: "0123456",
      email: "dfa@gmail.com",
      name: "nguyen van a",
      content: "ghjkjdahgkhkfsdafs",
    },
    {
      phone: "0123456",
      email: "dfa@gmail.com",
      name: "nguyen van a",
      content: "ghjkjdahgkhkfsdafs",
    },
    {
      phone: "0123456",
      email: "dfa@gmail.com",
      name: "nguyen van a",
      content: "ghjkjdahgkhkfsdafs",
    },
    {
      phone: "0123456",
      email: "dfa@gmail.com",
      name: "nguyen van a",
      content: "ghjkjdahgkhkfsdafs",
    },
    {
      phone: "0123456",
      email: "dfa@gmail.com",
      name: "nguyen van a",
      content: "ghjkjdahgkhkfsdafs",
    },
  ];
  return (
    <div className=" dark:bg-slate-900">
      <div className=" px-8">
        <Header />
      </div>
      <div className=" flex">
        <div className=" flex flex-col w-1/12">
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => handleTabChange("users")}
          >
            Users
          </button>
          <button
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => handleTabChange("requests")}
          >
            Request
          </button>
        </div>
        <div className=" flex-1">
          {activeTab === "users" && (
            <UserList userList={userList} onEdit={handleEditUser} />
          )}
          {activeTab === "requests" && (
            <RequestList
              requestList={requestList}
              onCreateUser={handleCreateUser}
            />
          )}
        </div>
      </div>
      {createUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg relative">
            {/* Nội dung của popup */}
            <div
              onClick={() => setCreateUser(null)}
              className=" absolute right-0 top-0 z-50"
            >
              <CloseIcon sx={{ color: "red", fontSize: 50 }} />
            </div>
            <CreateUser userData={createUser} />
          </div>
        </div>
      )}
      {editUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg relative">
            {/* Nội dung của popup */}
            <div
              onClick={() => setEditUser(null)}
              className=" absolute right-0 top-0 z-50"
            >
              <CloseIcon sx={{ color: "red", fontSize: 50 }} />
            </div>
            <EditUser userData={editUser} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
