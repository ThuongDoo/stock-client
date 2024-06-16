import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import BuysellSearch from "./components/BuysellSearch";
import { format } from "date-fns";
import UnauthorizedException from "../../../components/UnauthorizedException";
import BuySellSkeleton from "../../../skeletons/BuySellSkeleton";
import { EVENTS, socket } from "../../../utils/socket";
import SecurityDetail from "../../../components/SecurityDetail";

function BuySell() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReset, setIsReset] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState(null);

  useEffect(() => {
    socket.on(EVENTS.UPDATE_BUYSELL_DATA, (data) => {
      // Xử lý dữ liệu được nhận tại đây
      if (isReset) {
        setData(data.data);
      }
    });

    return () => {
      socket.off(EVENTS.UPDATE_BUYSELL_DATA);
    };
  }, [isReset]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await api
        .get(endpoints.BUYSELL)
        .then((res) => {
          setIsLoading(false);
          setData(res.data.data);
        })
        .catch((err) => {
          setError(err?.response?.status);
        });
    };
    if (isReset) {
      fetchData();
    }
  }, [isReset]);

  const handleSearch = (value) => {
    setIsReset(false);
    setIsLoading(true);
    console.log("value", value);
    let url = endpoints.BUYSELL + "?";

    // Kiểm tra và thêm thuộc tính date vào URL nếu tồn tại
    if (value.date) {
      url += `date=${value.date}&`;
    }

    // Kiểm tra và thêm thuộc tính ticker vào URL nếu tồn tại
    if (value.ticker) {
      url += `ticker=${value.ticker}&`;
    }
    if (value.date === null && (value.ticker === null || value.ticker === "")) {
      url += "limit=20&";
    }
    console.log(url);
    const fetchData = async () => {
      await api
        .get(url)
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
          setData(res.data.data);
        })
        .catch((err) => {
          setError(err?.response?.status);
        });
    };
    fetchData();
  };

  const handleSelect = (value) => {
    setIsOpenModal(true);
    setSelectedSecurity(value);
  };

  return (
    <div className=" flex flex-col px-4 py-4 gap-y-4">
      <div className=" flex justify-between">
        <BuysellSearch
          onSubmit={handleSearch}
          onReset={() => setIsReset(true)}
        />
      </div>
      {isLoading === true ? (
        <BuySellSkeleton />
      ) : (
        <div className=" max-h-[40rem]  overflow-y-auto block ">
          {data.length > 0 ? (
            <table className=" dark:text-white table-auto overflow-scroll w-full ">
              <thead>
                <tr className="">
                  <th className=" px-4 py-2">STT</th>
                  <th className=" px-4 py-2">Mã</th>
                  <th className=" px-4 py-2">Thời gian KN</th>
                  <th className=" px-4 py-2">Giá mua</th>
                  <th className=" px-4 py-2">Lãi/lỗ</th>
                  <th className=" px-4 py-2">Thời gian nắm giữ</th>
                  <th className=" px-4 py-2">Vị thế</th>
                  <th className=" px-4 py-2" colSpan={3}>
                    Ghi chú
                  </th>
                </tr>
              </thead>
              <tbody className="  ">
                {data?.map((stock, index) => (
                  <tr
                    key={index}
                    className={` ${
                      index % 2 === 1 ? "dark:bg-slate-900 bg-neutral-200" : ""
                    }  border border-slate-700 cursor-pointer `}
                    onClick={() => handleSelect(stock.ticker)}
                  >
                    <td>{index + 1}</td>
                    <td>{stock?.ticker}</td>
                    <td>{format(stock?.knTime, "dd-MM-yyyy")}</td>
                    <td>{stock?.buyPrice.toFixed(2)}</td>
                    <td
                      className={` ${
                        stock.profit > 0
                          ? "text-green-500"
                          : stock.profit < 0
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {stock?.profit + "%"}
                    </td>
                    <td>T + {stock?.holdingDuration}</td>
                    <td>
                      {stock?.status === 0
                        ? "Bán"
                        : stock?.status === 1
                        ? "Mua"
                        : stock?.status === 2
                        ? "Nắm giữ"
                        : "Mua mới"}
                    </td>
                    <td>
                      {stock?.sellTime !== null
                        ? format(stock?.sellTime, "dd-MM-yyyy")
                        : ""}
                    </td>
                    <td>
                      {stock?.sellPrice !== null
                        ? stock?.sellPrice.toFixed(2)
                        : ""}
                    </td>
                    <td>{stock?.risk ? stock?.risk : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Không tìm thấy dữ liệu</div>
          )}
        </div>
      )}
      {error === 401 && <UnauthorizedException />}
      {isOpenModal && (
        <SecurityDetail
          symbol={selectedSecurity}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
}

export default BuySell;
