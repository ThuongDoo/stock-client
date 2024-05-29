import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import { RocChart } from "./RocChart";
import { format } from "date-fns";
import { STRINGS } from "../../../constants/strings";
import Loading from "../../../skeletons/Loading";

const lineColors = [
  "#2962FF",
  "#26a69a",
  "#ef5350",
  "#FF33A1",
  "#33FFF6",
  "#FFAA33",
  "#A133FF",
  "#33FFAA",
  "#FFA833",
  "#33A1FF",
];

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
    ([category, data], index) => ({
      category,
      displayName: data[0].displayName,
      data,
      // color: lineColors[index],
      color: getRandomColorHex(),
    })
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
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.ROC)
        .then(async (res) => {
          const formattedTimeData = await formatData(res.data);
          const categorizedData = mergeObjectsByCategory(formattedTimeData);
          setData(categorizedData);
          setIsLoading(false);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className=" p-2  h-full">
      {isLoading === true ? (
        <Loading />
      ) : (
        <div className=" flex h-full">
          <div className=" flex-1 h-full">
            <RocChart data={data} />
          </div>
          <div className=" flex flex-col justify-between">
            {data.map((item) => (
              <div className="flex items-center">
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
