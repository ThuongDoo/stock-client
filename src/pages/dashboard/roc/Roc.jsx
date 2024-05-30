import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import { RocChart } from "./RocChart";
import { format } from "date-fns";
import { STRINGS } from "../../../constants/strings";
import Loading from "../../../skeletons/Loading";
import sizeof from "object-sizeof";

const lineColors = [
  "#F16889",
  "#D2294D",
  "#D3B6F4",
  "#1DDAE4",
  "#0906DE",
  "#B0FDF5",
  "#6542DC",
  "#B40ADB",
  "#49C75F",
  "#FEAFA0",
];

const buttonArray = ["6m", "1y", "2y", "5y"];

const getRandomColorHex = () => {
  // Sinh ngẫu nhiên các giá trị cho các thành phần màu RGB
  const r = Math.floor(Math.random() * 256); // Giá trị màu đỏ
  const g = Math.floor(Math.random() * 256); // Giá trị màu xanh lá cây
  const b = Math.floor(Math.random() * 256); // Giá trị màu xanh dương

  // Chuyển đổi các giá trị màu thành chuỗi hexa và đảm bảo có 2 chữ số
  const redHex = r.toString(16).padStart(2, "0");
  const greenHex = g.toString(16).padStart(2, "0");
  const blueHex = b.toString(16).padStart(2, "0");

  // Kết hợp các thành phần màu thành mã hexa hoàn chỉnh
  const hexColor = `#${redHex}${greenHex}${blueHex}`;

  return hexColor;
};

const formatData = async (stocks) => {
  const groupedData = {};

  // Lặp qua từng đối tượng trong mảng data
  stocks.forEach((obj) => {
    // Kiểm tra xem đã có đối tượng cho category này chưa
    if (!groupedData[obj.category]) {
      // Nếu chưa có, tạo một mảng mới để lưu trữ các đối tượng
      groupedData[obj.category] = {
        category: obj.category,
        displayName: obj.displayName,
        color: getRandomColorHex(),
        data: [],
      };
    }
    // Giữ lại chỉ các trường "time" và "value"
    const formattedDate = format(new Date(obj.time), "yyyy-MM-dd");
    const { value } = obj;
    const calculateRoc = (oldData, newData) => {
      return ((newData - oldData) / oldData) * 100;
    };

    let newValue = value;
    if (groupedData[obj.category].data.length > 0) {
      newValue = calculateRoc(groupedData[obj.category].data[0].value, value);
    }
    // Thêm đối tượng mới vào mảng của category tương ứng
    groupedData[obj.category].data.push({
      time: formattedDate,
      value: newValue,
    });
  });
  const resultArray = Object.entries(groupedData).map((item, index) => {
    // console.log(item);
    item[1].data[0].value = 0;
    return {
      ...item[1],
    };
  });
  return resultArray;
};

function Roc() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("6m");
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await api
        .get(endpoints.ROC + `/${timeRange}`)
        .then(async (res) => {
          const formattedData = await formatData(res.data);
          setIsLoading(false);
          setData(formattedData);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, [timeRange]);

  return (
    <div className=" p-2  h-full">
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className=" flex h-full relative">
          <div className=" absolute top-5 left-10 z-50 flex gap-x-3">
            {buttonArray.map((item, index) => (
              <button
                key={index}
                className={`${
                  timeRange === item ? "bg-black" : "bg-blue-500"
                } hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded-md`}
                onClick={() => setTimeRange(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className=" flex-1 h-full">
            <RocChart data={data} />
          </div>
          <div className=" flex flex-col justify-between">
            {data.map((item, index) => (
              <div className="flex items-center" key={index}>
                <div
                  style={{ backgroundColor: item.color }}
                  className=" w-2 h-2 rounded-full"
                ></div>
                <h1 className=" text-xs text-left">{item.displayName}</h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Roc;
