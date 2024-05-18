import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import CustomTable from "../../../components/CustomTable";
import { STRINGS } from "../../../constants/strings";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../../../components/CustomModal";
import CreateUserForm from "./CreateUserForm";

function RequestManager() {
  const [requests, setRequests] = useState([]);
  const [chosenIds, setChosenIds] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const notify = ({ text, onAgree }) => {
    toast.warning(
      <div className=" flex flex-col gap-y-2">
        <span>{text}</span>
        <div className=" space-x-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={onAgree}
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

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.USER_REQUEST)
        .then((res) => {
          setRequests(res.data);
        })
        .catch((e) => {
          console.log(e);
          //TODO: catch error
        });
    };
    fetchData();
  }, [isReload]);

  const handleCheckboxes = (value) => {
    console.log(value);
    const chosenIndex = value
      .map((value, index) => (value ? index : undefined))
      .filter((index) => index !== undefined);

    const chosenRequestIds = chosenIndex.map((index) => requests[index].id);
    setChosenIds(chosenRequestIds);
  };

  const handleCreate = async (values) => {
    values.date = Number(values.date);
    console.log(values);
    await api
      .post(endpoints.SIGNUP, values)
      .then((res) => {
        notify({ text: STRINGS.REQUEST_DELETE_CONFIRM, onAgree: handleDelete });

        setIsOpenModal(false);
      })
      .catch((err) => {
        toast.error(STRINGS.USER_CREATED_FAILED);
      });
  };

  const handleDelete = async () => {
    const idsString = chosenIds.join(",");
    console.log(idsString);
    await api
      .delete(endpoints.USER_REQUEST + `/${idsString}`)
      .then((res) => {
        console.log(res);
        //TODO: fetch success
        setIsReload(!isReload);
        setChosenIds([]);
        toast.success(STRINGS.DELETE_SUCCESSFULLY);
      })
      .catch((e) => {
        console.log(e);
        toast.error(STRINGS.DELETE_FAILED);
        //TODO: catch e
      });
  };

  const columns = [
    {
      field: "phone",
      headerName: "Phone",
      // headerClassName: "bg-blue-500",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      // headerClassName: "bg-blue-500",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      // headerClassName: "bg-blue-500",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "content",
      headerName: "Description",
      // headerClassName: "bg-blue-500",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
  ];

  console.log(requests);

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
          onClick={() => setIsOpenModal(true)}
        >
          {STRINGS.CREATE}
        </button>
      </div>
      <CustomTable
        columns={columns}
        rows={requests}
        checkboxesVisible={true}
        manageVisible={false}
        onCheckboxes={handleCheckboxes}
      />
      {isOpenModal && (
        <CustomModal
          label={STRINGS.USER_CREATE}
          onClose={() => setIsOpenModal(false)}
          children={
            <CreateUserForm
              userData={requests.find((request) => request.id === chosenIds[0])}
              onSubmit={handleCreate}
            />
          }
        />
      )}
    </div>
  );
}

export default RequestManager;
