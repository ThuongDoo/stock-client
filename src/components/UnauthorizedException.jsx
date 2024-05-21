import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { STRINGS } from "../constants/strings";
import api, { endpoints } from "../utils/api";
import { logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function UnauthorizedException({ hideToastContainer = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = async () => {
    await api
      .get(endpoints.LOGOUT)
      .then((res) => {})
      .catch((e) => {})
      .finally(() => {
        dispatch(logout());
        navigate("/login");
      });
  };
  const notify = ({ text }) => {
    toast.warning(
      <div className=" flex flex-col gap-y-2">
        <span>{text}</span>
        <div className=" space-x-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={() => handleNavigate()}
          >
            {STRINGS.NAVIGATE_LOGIN}
          </button>
        </div>
      </div>,
      {
        closeButton: false,
        autoClose: 5000,
        onClose: () => {
          handleNavigate();
        }, // Nếu bạn muốn thực hiện một hành động nào đó khi toast được đóng
      }
    );
  };

  notify({ text: STRINGS.ERROR_UNAUTHORIZED });
  return (
    <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50">
      {hideToastContainer === false && (
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
      )}
    </div>
  );
}

export default UnauthorizedException;
