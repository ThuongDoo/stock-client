import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../utils/api";
import moment from "moment";
import { format } from "date-fns";
import CustomTable from "../../components/CustomTable";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { STRINGS } from "../../constants/strings";
import CustomModal from "../../components/CustomModal";
import CreateUserForm from "./requestManager/CreateUserForm";
import EditUserForm from "./requestManager/EditUserForm";
import UnauthorizedException from "../../components/UnauthorizedException";
import Footer from "../../components/Footer";

function UserManager() {
  const [users, setUsers] = useState([]);
  const [chosenIds, setChosenIds] = useState([]);
  const [error, setError] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const handleCheckboxes = (value) => {
    console.log(value);
    const chosenIndex = value
      .map((value, index) => (value ? index : undefined))
      .filter((index) => index !== undefined);

    const chosenRequestIds = chosenIndex.map((index) => users[index].phone);
    setChosenIds(chosenRequestIds);
  };

  const notify = ({ text }) => {
    toast.warning(
      <div className=" flex flex-col gap-y-2">
        <span>{text}</span>
        <div className=" space-x-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={handleDelete}
          >
            {STRINGS.YES}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={toast.dismiss}
          >
            {STRINGS.NO}
          </button>
        </div>
      </div>,
      {
        closeButton: false,
        autoClose: 5000,
        onClose: () => {}, // Nếu bạn muốn thực hiện một hành động nào đó khi toast được đóng
      }
    );
  };

  const formatData = (data) => {
    const formattedData = data.map((user) => {
      const expirationDate = moment(user.expirationDate);
      const duration = moment.duration(expirationDate.diff(moment()));

      const daysRemaining = duration.asDays();

      const hours = duration.hours();
      const minutes = duration.minutes();

      let expirationText;

      if (daysRemaining >= 0) {
        expirationText = `${Math.floor(
          daysRemaining
        )} ngày ${hours} giờ ${minutes} phút`;
      } else {
        expirationText = "Đã hết hạn";
      }
      return {
        phone: user.phone,
        email: user.email,
        name: user.name,
        roles: user.roles,
        expirationDate:
          user.expirationDate === null
            ? "null"
            : format(new Date(user.expirationDate), "dd-MM-yyyy HH:mm:ss"),
        daysRemaining: expirationText,
      };
    });
    return formattedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.USER)
        .then((res) => {
          const data = formatData(res.data);
          console.log(data);
          console.log(res.data);
          setUsers(data);
        })
        .catch((e) => {
          setError(e.response.status);
        });
    };
    fetchData();
  }, [isReload]);
  console.log("reload");
  console.log(error);

  const handleEdit = async (value) => {
    // onEdit(value);
    if (value.password === "") delete value.password;
    value.date = Number(value.date);
    console.log(value);
    await api
      .patch(endpoints.USER_UPDATE, value)
      .then((res) => {
        toast.success(STRINGS.USER_UPDATED);
        setIsReload(!isReload);
        setIsOpenEditModal(false);
      })
      .catch((err) => {
        toast.error(STRINGS.USER_CREATED_FAILED);
      });
  };

  const handleDelete = async (value) => {
    const idsString = chosenIds.join(",");
    await api
      .delete(endpoints.USER_DELETE + `/${idsString}`)
      .then((res) => {
        console.log(res);
        //TODO: fetch success
        setIsReload(!isReload);
        setChosenIds([]);
        toast.success(STRINGS.DELETE_SUCCESSFULLY);
      })
      .catch((e) => {
        toast.error(STRINGS.DELETE_FAILED);
      });
  };

  const handleReset = async (value) => {
    console.log(value);
    await api
      .patch(`user/resetPassword/${value}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleCreate = async (values) => {
    values.date = Number(values.date);
    console.log(values);
    await api
      .post(endpoints.SIGNUP, values)
      .then((res) => {
        toast.success(STRINGS.USER_CREATED);
        setIsReload(!isReload);
        setIsOpenCreateModal(false);
      })
      .catch((err) => {
        toast.error(STRINGS.USER_CREATED_FAILED);
      });
  };

  const columns = [
    {
      field: "phone",
      headerName: "Số điện thoại",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
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

    // {
    //   field: "roles",
    //   headerName: "Gói",
    //   // headerClassName: "bg-blue-500",
    //   type: "number",
    //   minWidth: 200,
    //   visible: true,
    //   flex: 1,
    // },
    {
      field: "expirationDate",
      headerName: "Ngày hết hạn",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "daysRemaining",
      headerName: "Số ngày còn lại",
      // headerClassName: "bg-blue-500",
      type: "number",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
  ];

  return (
    <div className=" p-2">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className=" flex justify-end items-center gap-2">
        <button
          className=" bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded disabled:bg-gray-200 disabled:opacity-50 disabled:text-gray-400"
          disabled={chosenIds.length < 1}
          onClick={() => {
            notify({ text: STRINGS.DELETE_CONFIRM, onAgree: handleDelete });
          }}
        >
          {STRINGS.DELETE}
        </button>
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded disabled:bg-gray-200 disabled:opacity-50 disabled:text-gray-400"
          disabled={!(chosenIds.length === 1)}
          onClick={() => setIsOpenEditModal(true)}
        >
          {STRINGS.EDIT}
        </button>
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded disabled:bg-gray-200 disabled:opacity-50 disabled:text-gray-400"
          onClick={() => setIsOpenCreateModal(true)}
        >
          {STRINGS.CREATE}
        </button>
      </div>
      <CustomTable
        columns={columns}
        rows={users}
        checkboxesVisible={true}
        manageVisible={false}
        onCheckboxes={handleCheckboxes}
      />
      {isOpenCreateModal && (
        <CustomModal
          label={STRINGS.USER_CREATE}
          onClose={() => setIsOpenCreateModal(false)}
          children={<CreateUserForm onSubmit={handleCreate} />}
        />
      )}
      {isOpenEditModal && (
        <CustomModal
          label={STRINGS.USER_EDIT}
          onClose={() => setIsOpenEditModal(false)}
          children={
            <EditUserForm
              userData={users.find((user) => user.phone === chosenIds[0])}
              onSubmit={handleEdit}
            />
          }
        />
      )}
      {error === 401 && <UnauthorizedException hideToastContainer />}
    </div>
  );
}

export default UserManager;
