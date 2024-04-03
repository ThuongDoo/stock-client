import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserList from "../components/UserList";
import RequestList from "../components/RequestList";
import CreateUser from "../components/CreateUser";
import CloseIcon from "@mui/icons-material/Close";
import EditUser from "../components/EditUser";
import api from "../utils/api";
import TabBar from "../components/TabBar";
import ImportFile from "../components/ImportFile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../slices/userSlice";

function Admin() {
  const [activeTab, setActiveTab] = useState("users");
  const [createUser, setCreateUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [userRequest, setUserRequest] = useState([]);
  const [requestUpdateFlag, setRequestUpdateFlag] = useState(false);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector(getUser);

  const tabs = [
    { name: "users", displayName: "Users" },
    { name: "requests", displayName: "Requests" },
    { name: "import", displayName: "Import" },
  ];

  const handleTabChange = (tabName) => {
    setActiveTab(tabName.name);
  };

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [activeTab]);

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
        <TabBar tabs={tabs} style={1} onTabClick={handleTabChange} />
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
          {activeTab === "import" && <ImportFile />}
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
