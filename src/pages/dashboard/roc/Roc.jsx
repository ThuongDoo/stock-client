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

const mergeObjectsByCategory = (arrayOfObjects) => {
  const mergedObjects = {};

  // Lặp qua mảng các object
  arrayOfObjects.forEach((object) => {
    // Nếu đã có category tương ứng trong mergedObjects, thêm object vào mảng đó
    if (mergedObjects.hasOwnProperty(object.category)) {
      mergedObjects[object.category].push(object);
    } else {
      // Nếu chưa có, tạo một mảng mới chứa object và lưu vào mergedObjects
      mergedObjects[object.category] = [object];
    }
  });

  // Chuyển đổi mergedObjects thành mảng
  const resultArray = Object.entries(mergedObjects).map(
    ([category, data], index) => {
      const calculateRoc = (oldData, newData) => {
        return ((newData - oldData) / oldData) * 100;
      };
      const newData = data.map((row, index) => {
        return {
          time: row.time,
          value: calculateRoc(row.value, data[0].value),
        };
      });
      return {
        category,
        displayName: data[0].displayName,
        data: newData,
        // color: lineColors[index],
        color: getRandomColorHex(),
      };
    }
  );

  return resultArray;
};

const formatData = async (stocks) => {
  const tempData = await stocks.map((item) => {
    const inputDate = item.time;
    const formattedDate = format(inputDate, "yyyy-MM-dd");

    return {
      ...item,
      time: formattedDate,
    };
  });
  return tempData;
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
          console.log(res.data);
          const formattedTimeData = await formatData(res.data);
          const categorizedData = mergeObjectsByCategory(formattedTimeData);
          console.log(categorizedData);
          setIsLoading(false);
          setData(categorizedData);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, [timeRange]);

  console.log(data);
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
