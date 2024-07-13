import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { getUser } from "../../slices/userSlice";
import { format } from "date-fns";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { STRINGS } from "../../constants/strings";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import api, { endpoints } from "../../utils/api";
import UnauthorizedException from "../../components/UnauthorizedException";
import { useNavigate } from "react-router-dom";

function Settings() {
  const user = useSelector(getUser);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.roles === "admin") {
      navigate("/admin");
    }
  }, []);

  const accountItems = [
    { label: "Họ và tên", content: user.username, icon: PersonIcon },
    { label: "Email", content: user.email, icon: EmailIcon },
    { label: "Số điện thoại", content: user.phone, icon: LocalPhoneIcon },
    {
      label: "Ngày hết hạn",
      content: format(new Date(user.expirationDate), "dd-MM-yyyy"),
      icon: CalendarMonthIcon,
    },
  ];

  const changePassword = async () => {
    await api
      .get(endpoints.VERIFY_CHANGE_PASSWORD + `/?email=${user.email}`)
      .then((res) => {
        setIsSuccess(1);
      })
      .catch((e) => {
        setError(e?.response?.status);

        setIsSuccess(-1);
      });
  };

  return (
    <div className=" bg-slate-900 min-h-screen h-screen">
      <div className=" px-8 pb-4 absolute w-full z-50">
        <Header />
      </div>
      <div className="  flex flex-col w-full h-full justify-center items-center">
        <div className=" bg-white text-black rounded-xl w-2/3 space-y-4">
          <h1 className=" text-3xl bg-blue-100 rounded-xl text-left p-4">
            {STRINGS.ACCOUNT}
          </h1>
          <div className="  w-full  flex flex-col space-y-3 p-4">
            <div className=" flex gap-x-4">
              <div className=" w-1/2">
                <AccountItem item={accountItems[0]} />
              </div>
              <div className=" w-1/2">
                <AccountItem item={accountItems[1]} />
              </div>
            </div>
            <div className=" flex gap-x-4">
              <div className=" w-1/2">
                <AccountItem item={accountItems[2]} />
              </div>
              <div className=" w-1/2">
                <AccountItem item={accountItems[3]} />
              </div>
            </div>
            <div className=" flex justify-end">
              <button
                className=" bg-blue-300 px-4 py-2 rounded-full hover:bg-blue-200"
                onClick={() => {
                  changePassword();
                }}
              >
                {STRINGS.CHANGE_PASSWORD}
              </button>
            </div>
            {isSuccess === 1 ? (
              <h1>{STRINGS.CHANGE_PASSWORD_NOTI}</h1>
            ) : isSuccess === -1 ? (
              <h1>{STRINGS.VERIFY_FAILED}</h1>
            ) : (
              <h1></h1>
            )}
          </div>
        </div>
      </div>
      {error === 401 && navigate("/login")}
    </div>
  );
}

export default Settings;

const AccountItem = ({ item }) => {
  return (
    <div>
      <h1 className=" text-left">{item.label}</h1>
      <div className=" flex items-center bg-blue-100 rounded-full px-4 py-2 gap-x-2">
        <item.icon sx={{ color: "black", fontSize: 20 }} />
        <h1>{item.content}</h1>
      </div>
    </div>
  );
};
