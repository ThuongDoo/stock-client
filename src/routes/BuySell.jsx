import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { SOCKET_SERVER_URL } from "../constants/socket";
import { io } from "socket.io-client";
import BuysellSearch from "../components/BuysellSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";

function BuySell() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReset, setIsReset] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogout = async () => {
    await api
      .get("/user/logout")
      .then((res) => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const fetchDate = async () => {
      await api
        .get("/user/protected")
        .then((res) => console.log("success"))
        .catch((err) => {
          userLogout();
        });
    };
    fetchDate();
  }, [data, isReset]);
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("buysell", (data) => {
      console.log("Received data:", data);
      // Xử lý dữ liệu được nhận tại đây
      console.log(data);
      updateData(data.data, data.realtimeData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await api
        .get("/stock/buysell?limit=20")
        .then((res) => {
          updateData(res.data.data, res.data.realtimeData);
          // setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    console.log("hih");
  }, [isReset]);

  const handleSearch = (value) => {
    let url = "/stock/buysell?";

    // Kiểm tra và thêm thuộc tính date vào URL nếu tồn tại
    if (value.date) {
      url += `date=${value.date}&`;
    }

    // Kiểm tra và thêm thuộc tính ticker vào URL nếu tồn tại
    if (value.ticker) {
      url += `ticker=${value.ticker}&`;
    }
    if (value.date === null && value.ticker === null) {
      url += "limit=20&";
    }
    const fetchData = async () => {
      await api
        .get(url)
        .then((res) => {
          console.log(res.data);
          updateData(res.data.data, res.data.realtimeData);
          // setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  };

  const updateData = (newData, newRealtimeData) => {
    const aWithProfit = newData.map((itemA) => {
      // Tìm phần tử tương ứng trong mảng b dựa trên name
      const correspondingItemB = newRealtimeData.find(
        (itemB) => itemB.ticker === itemA.ticker
      );
      let profit =
        (((correspondingItemB ? correspondingItemB.price : itemA.price) -
          itemA.price) /
          itemA.price) *
        100;
      profit = parseFloat(profit).toFixed(2);
      // Trả về phần tử mới có thuộc tính profit
      return { ...itemA, profit };
    });
    setData(aWithProfit);
  };
  return (
    <div className=" flex flex-col px-4 py-4 gap-y-4">
      <div className=" flex justify-between">
        <BuysellSearch
          onSubmit={handleSearch}
          onReset={() => setIsReset(!isReset)}
        />
      </div>
      <div className=" max-h-[40rem]  overflow-y-auto block ">
        {data.length > 0 ? (
          <table className=" dark:text-white table-auto overflow-scroll w-full ">
            <thead>
              <tr className="">
                <th className=" px-4 py-2">STT</th>
                <th className=" px-4 py-2">Mã CP</th>
                <th className=" px-4 py-2">Thời gian KN</th>
                <th className=" px-4 py-2">Giá mua</th>
                <th className=" px-4 py-2">Lãi/lỗ tạm tính (%)</th>
                <th className=" px-4 py-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="  ">
              {data?.map((stock, index) => (
                <tr
                  key={index}
                  className={` ${
                    index % 2 === 1 ? "dark:bg-slate-900 bg-neutral-200" : ""
                  }  border border-slate-700 `}
                >
                  <td>{index}</td>
                  <td>{stock?.ticker}</td>
                  <td>{stock?.date}</td>
                  <td>{stock?.price.toFixed(2)}</td>
                  <td
                    className={` ${
                      stock.profit > 0
                        ? "text-green-500"
                        : stock.profit < 0
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {stock?.profit} %
                  </td>
                  <td>
                    {stock?.status === 1
                      ? "Nắm giữ"
                      : stock?.status === 0
                      ? "Bán"
                      : "Mua mới"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Không tìm thấy dữ liệu</div>
        )}
      </div>
    </div>
  );
}

export default BuySell;
