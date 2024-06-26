import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import { RocChart } from "./RocChart";
import { format } from "date-fns";
import { STRINGS } from "../../../constants/strings";
import Loading from "../../../skeletons/Loading";
import TimelineSlider from "../../../components/TimelineSlider";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, setCategory } from "../../../slices/categorySlice";
import UnauthorizedException from "../../../components/UnauthorizedException";

const colors = [
  "#FF0000", // Màu đỏ
  "#00FF00", // Màu xanh lá cây
  "#0000FF", // Màu xanh da trời
  "#00FFFF", // Màu xanh da trời nhạt
  "#FFA500", // Màu cam
  "#FFC0CB", // Màu hồng
  "#FFFF00", // Màu vàng
  "#EE82EE", // Màu violet
  "#800080", // Màu tím
  "#808080", // Màu xám
  "#008000", // Màu xanh lục
  "#000080", // Màu xanh dương đậm
  "#A52A2A", // Màu nâu
  "#000000", // Màu đen
  "#FFFFFF", // Màu trắng
  "#8B0000", // Màu đỏ đậm
  "#FF8C00", // Màu cam đậm
  "#FFFFE0", // Màu vàng nhạt
  "#ADD8E6", // Màu xanh dương nhạt
  "#D8BFD8", // Màu tím nhạt
  "#2E8B57", // Màu xanh ngọc bích
  "#006400", // Màu xanh lục đậm
  "#B87333", // Màu đồng
  "#D3D3D3", // Màu xám nhạt
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
  stocks.forEach((obj, index) => {
    // Kiểm tra xem đã có đối tượng cho category này chưa
    if (!groupedData[obj.category]) {
      // Nếu chưa có, tạo một mảng mới để lưu trữ các đối tượng
      groupedData[obj.category] = {
        category: obj.category,
        displayName: obj.displayName,
        data: [],
        isChosen: true,
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
  const resultArray = Object.entries(groupedData)
    .map((item, index) => {
      item[1].data[0].value = 0;
      return {
        ...item[1],
        color: colors[index],
      };
    })
    .sort((a, b) => {
      const nameA = a.category.toUpperCase(); // Chuyển tên thành chữ hoa để so sánh
      const nameB = b.category.toUpperCase(); // Chuyển tên thành chữ hoa để so sánh
      return (nameA ?? "") < (nameB ?? "")
        ? -1
        : (nameA ?? "") > (nameB ?? "")
        ? 1
        : 0;
    });

  return resultArray;
};

function Roc() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState([]);
  const [error, setError] = useState(null);
  const chosenCategories = useSelector(getCategory);
  const dispatch = useDispatch();
  useEffect(() => {}, [timeRange]);

  const updateData = (startTime, endTime) => {
    setIsLoading(true);
    const fetchData = async () => {
      await api
        .get(endpoints.ROC + `/?startDate=${startTime}&endDate=${endTime}`)
        .then(async (res) => {
          const formattedData = await formatData(res.data);

          setIsLoading(false);
          setData(formattedData);
        })
        .catch((e) => setError(e?.response?.status));
    };
    fetchData();
  };

  const handleTimeline = (value1, value2) => {
    const newTimeRange = [value1, value2];
    setTimeRange(newTimeRange);
    updateData(value1, value2);
  };

  const handleCheckboxChange = (index) => {
    const newChosenData = [...chosenCategories];
    newChosenData[index] = !newChosenData[index];
    dispatch(setCategory(newChosenData));
  };

  return (
    <div className=" p-2 h-full flex flex-col gap-y-2">
      {error === 401 ? (
        <div className=" flex justify-center items-center h-full w-full">
          <UnauthorizedException />
        </div>
      ) : (
        <>
          {isLoading === true ? (
            <div className=" flex-1">
              <Loading />
            </div>
          ) : (
            <div className=" flex flex-1 gap-x-2">
              <div className=" flex-1 ">
                <RocChart data={data} chosenData={chosenCategories} />
              </div>
              <div className=" flex flex-col ">
                {data.map((item, index) => (
                  <label
                    className="flex items-center gap-x-2 hover:bg-white hover:text-black flex-1 px-2"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      checked={chosenCategories[index]}
                      onChange={() => handleCheckboxChange(index)}
                    ></input>
                    <div
                      style={{ backgroundColor: item.color }}
                      className=" w-2 h-2 rounded-full"
                    ></div>
                    <h1 className=" text-xs text-left">{item.displayName}</h1>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="">
            <TimelineSlider onChange={handleTimeline} />
          </div>
        </>
      )}
    </div>
  );
}

export default Roc;
