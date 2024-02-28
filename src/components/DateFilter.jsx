import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function DateFilter({ onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = moment(new Date()).format("dddd, DD/MM/YYYY");
  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
    // Xử lý ngày được chọn ở đây
  };

  return (
    <div className=" dark:bg-slate-900 dark:text-white">
      <label htmlFor="date" className=" ">
        Chọn ngày:
      </label>
      <DatePicker
        id="date"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Định dạng ngày tháng
        className=" border rounded-lg px-2 dark:bg-slate-900 dark:border-slate-700 "
        todayButton={today}
      />
    </div>
  );
}

export default DateFilter;
