import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserList from "../components/UserList";
import RequestList from "../components/RequestList";
import CreateUser from "../components/CreateUser";
import CloseIcon from "@mui/icons-material/Close";
import EditUser from "../components/EditUser";
import api from "../utils/api";

function Admin() {
  const [activeTab, setActiveTab] = useState("users");
  const [createUser, setCreateUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [userRequest, setUserRequest] = useState([]);
  const [requestUpdateFlag, setRequestUpdateFlag] = useState(false);
  const [userData, setUserData] = useState([]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("user/userRequest")
        .then((res) => {
          console.log(res.data);
          setUserRequest(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [requestUpdateFlag]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("user")
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [activeTab]);

  const handleCreateUser = (value) => {
    setCreateUser(value);
  };

  const handleEditUser = (value) => {
    setEditUser(value);
  };

  return (
    <div className=" dark:bg-slate-900">
      <div className=" px-8">
        <Header style={2} />
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
            <UserList userList={userData} onEdit={handleEditUser} />
          )}
          {activeTab === "requests" && (
            <RequestList
              requestList={userRequest}
              onCreateUser={handleCreateUser}
              onChange={() => setRequestUpdateFlag(!requestUpdateFlag)}
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
