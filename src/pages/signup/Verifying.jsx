import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { STRINGS } from "../../constants/strings";
import { useLocation, useNavigate } from "react-router-dom";
import api, { endpoints } from "../../utils/api";

function Verifying() {
  const [isSuccess, setIsSuccess] = useState(0);

  // Lấy giá trị của query parameters

  const params = new URLSearchParams(window.location.search);
  let token = params.get("token");

  // Bảo vệ lại dấu '+'
  token = token.replace(/ /g, "+");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await api
        .post(endpoints.VERIFY, { token })
        .then(() => {
          setIsSuccess(1);
        })
        .catch((e) => {
          setIsSuccess(-1);
        });
    };
    fetchData();
  }, [token]);

  return (
    <div className=" flex h-screen justify-center bg-black">
      <img
        src="https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg"
        alt=""
        className=" absolute left-0  w-full h-full opacity-40 z-0"
      />
      <div className="  pb-4 absolute w-full z-50 px-6 md:px-12 lg:px-24">
        <Header hidden={true} />
      </div>
      <div className=" z-40 text-black flex justify-center items-center ">
        <div className=" bg-white flex flex-col justify-center items-start rounded-lg p-10 gap-y-20">
          {isSuccess === 0 ? (
            <h1>{STRINGS.VERIFYING}</h1>
          ) : isSuccess === 1 ? (
            <span>
              {STRINGS.VERIFIED}{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className=" text-blue-500 cursor-pointer"
              >
                {STRINGS.LOGIN}
              </span>
            </span>
          ) : (
            <h1>{STRINGS.VERIFY_FAILED}</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verifying;
