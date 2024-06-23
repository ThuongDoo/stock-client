import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import api, { endpoints } from "../utils/api";
import AddIcon from "@mui/icons-material/Add";
import TabBar from "./TabBar";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import OverviewTab from "./OverviewTab";
import SignalTab from "./SignalTab";
import RemoveIcon from "@mui/icons-material/Remove";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { STRINGS } from "../constants/strings";

function SecurityDetail({ onClose, symbol, onReload = () => {} }) {
  const [securityInfo, setSecurityInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const tabs = [
    { name: "tong-quan", displayName: "Biến động thị trường" },
    { name: "tin-hieu", displayName: "Tín hiệu" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const user = useSelector(getUser);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.SSI_SECURITY + `/?indexes=${symbol}`)
        .then((res) => {
          setSecurityInfo(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchData();
  }, [symbol]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.USER_SECURITY + `/${user.phone}?symbol=${symbol}`)
        .then((res) => {
          if (res.data.data) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, [isReload]);

  const handleTabBar = (value) => {
    setActiveTab(value.name);
  };

  const handleFavorite = async (value) => {
    await api
      .post(endpoints.USER_SECURITY + `/${user.phone}/${value}`)
      .then((res) => {
        onReload(true);
        toast.success(STRINGS.FAVORITE_ADD);

        setIsReload(!isReload);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          toast.error("Bạn cần đăng nhập để thực hiện chức năng này.");
        }
      });
  };

  const handleUnFavorite = async (value) => {
    await api
      .delete(endpoints.USER_SECURITY + `/${user.phone}/${value}`)
      .then((res) => {
        onReload(true);
        toast.success(STRINGS.FAVORITE_DELETE);
        setIsReload(!isReload);
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          toast.error("Bạn cần đăng nhập để thực hiện chức năng này.");
        }
      });
  };

  return (
    <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50">
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
      <div
        className=" w-full h-full"
        onClick={() => {
          onClose(true);
        }}
      ></div>
      <div className=" dark:bg-slate-900 bg-neutral-200 text-black dark:text-white p-4 absolute w-3/4  h-3/4 flex flex-col rounded-xl  drop-shadow-glow gap-y-2">
        <div className=" flex justify-between border-b border-white">
          <div className=" pb-3">
            <div className=" flex gap-x-3">
              <div className=" flex">
                <h1 className=" text-lg font-bold">{symbol}: </h1>
                {/* <div className=" bg-white w-0.5"></div> */}
                <h1 className=" text-lg font-bold">
                  {" "}
                  {securityInfo?.Exchange}
                </h1>
              </div>
              {isFavorite ? (
                <button
                  className=" flex items-center bg-red-500 hover:bg-red-700 font-semibold py-0.5 px-2 rounded"
                  onClick={() => {
                    handleUnFavorite(symbol);
                  }}
                >
                  <h1>Bỏ theo dõi</h1>
                  <RemoveIcon sx={{ color: "white", fontSize: 20 }} />
                </button>
              ) : (
                <button
                  className=" flex items-center bg-blue-500 hover:bg-blue-700 font-semibold py-0.5 px-2 rounded"
                  onClick={() => {
                    handleFavorite(symbol);
                  }}
                >
                  <h1>Theo dõi</h1>
                  <AddIcon sx={{ color: "white", fontSize: 20 }} />
                </button>
              )}
            </div>
            <h1 className=" text-left">{securityInfo?.SymbolName}</h1>
          </div>
          <div className=" flex flex-col items-end justify-between">
            <div
              className=" bg-red-500 cursor-pointer flex items-center justify-center"
              onClick={() => onClose(true)}
            >
              <CloseIcon sx={{ color: "white", fontSize: 20 }} />
            </div>
            <div className="">
              <TabBar
                tabs={tabs}
                isHorizontal
                onTabClick={handleTabBar}
                style={{
                  fontSize: "1rem",
                  button: {
                    padding: "2px",
                    onActive: { boxShadow: "inset 0 -4px 0 0 white" },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className=" h-full">
          {activeTab === tabs[0].name ? (
            <OverviewTab symbol={symbol} />
          ) : (
            <SignalTab symbol={symbol} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SecurityDetail;
