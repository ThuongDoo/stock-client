import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function DateFilter({ onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = moment(new Date()).format("dddd, DD/MM/YYYY");

  const handleDateChange = (date) => {
    // console.log(date);
    if (date) {
      date.setHours(7);
    }
    setSelectedDate(date);
    onChange(date);
    // Xử lý ngày được chọn ở đây
  };

  return (
    <div className="  dark:text-white flex items-center gap-x-2">
      {/* <label htmlFor="date" className=" ">
        Chọn ngày:
      </label> */}
      <DatePicker
        id="date"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Định dạng ngày tháng
        // showMonthYearDropdown
        showYearDropdown
        showMonthDropdown
        className=" border rounded-lg px-2 py-2 dark:bg-slate-900 dark:border-slate-700 border-black w-48"
        todayButton={today}
        isClearable
        placeholderText="Chọn ngày"
      />
    </div>
  );
}

export default DateFilter;
