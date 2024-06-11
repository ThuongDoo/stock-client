// TimelineSlider.js
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { addMonths, differenceInMonths, format, subYears } from "date-fns";
import { vi } from "date-fns/locale";

const TimelineSlider = ({ onChange }) => {
  const now = new Date();
  const fiveYearsAgo = subYears(now, 5);

  // Tính tổng số tháng từ 5 năm trước đến hiện tại
  const totalMonths = differenceInMonths(now, fiveYearsAgo);

  // Chuyển đổi các tháng thành giá trị số (index)
  const indexToDate = (index) => addMonths(fiveYearsAgo, index);

  // State quản lý vị trí hai nút trượt
  const [range, setRange] = useState([totalMonths - 12, totalMonths]);

  // Hàm gọi fetchData

  // State để xác định trạng thái kéo trượt
  const [isSliding, setIsSliding] = useState(false);

  // Hàm xử lý sự kiện onChange
  const handleSliderChange = (value) => {
    setRange(value);
    setIsSliding(true);
  };

  // Hàm xử lý sự kiện onAfterChange
  const handleSliderAfterChange = (value) => {
    setIsSliding(false);
    onChange(indexToDate(value[0]), indexToDate(value[1]));
  };

  useEffect(() => {
    onChange(indexToDate(range[0]), indexToDate(range[1]));
  }, []);

  return (
    <div className="max-w-lg mx-auto ">
      <Slider
        styles={{
          handle: {
            height: 21, // Chiều cao của handle
            width: 30, // Chiều rộng của handle
            borderRadius: "4px", // Độ cong của góc handle để tạo thành hình chữ nhật
            backgroundColor: "grey",
            accentColor: "grey",
            color: "grey",
            borderColor: "grey",
            outlineColor: "grey",
            opacity: 100,
          },
          rail: { height: 10 },
          track: { height: 10 },
        }}
        style={{ height: 10 }}
        range
        min={0}
        pushable
        max={totalMonths}
        value={range}
        onChange={handleSliderChange}
        onChangeComplete={handleSliderAfterChange}
        tipFormatter={(index) =>
          format(indexToDate(index), "MMM yyyy", { locale: vi })
        }
        // marks={Array.from({ length: 6 }, (_, i) => {
        //   const date = addMonths(fiveYearsAgo, i * 12);
        //   return { [i * 12]: format(date, "yyyy", { locale: vi }) };
        // }).reduce((acc, curr) => ({ ...acc, ...curr }), {})}
      />
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">
          {format(indexToDate(range[0]), "dd/MM/yyyy", { locale: vi })} -{" "}
          {format(indexToDate(range[1]), "dd/MM/yyyy", { locale: vi })}
        </p>
      </div>
    </div>
  );
};

export default TimelineSlider;
