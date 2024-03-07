import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";
import api from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

function sortByTickerLengthAscending(data) {
  return data.sort((a, b) => a.length - b.length);
}

function BuysellSearch({ onSubmit, onReset }) {
  const [tickerName, setTickerName] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchTickerName = async () => {
      console.log("reload");
      await api
        .get("/stock/getAll")
        .then((res) => {
          const sortData = res.data;
          sortByTickerLengthAscending(sortData);
          setTickerName(sortData);
        })
        .catch((err) => console.log(err));
    };
    fetchTickerName();
  }, []);

  const handleSearchBar = (value) => {
    setSelectedTicker(value);
  };

  const handleDateFilter = (value) => {
    setSelectedDate(value);
  };

  const handleSubmit = () => {
    onSubmit({
      date: moment(selectedDate).toISOString(),
      ticker: selectedTicker,
    });
  };

  return (
    <div className=" flex flex-col gap-y-3 lg:flex-row gap-x-3">
      <div className=" flex flex-col sm:flex-row gap-x-3 gap-y-3">
        <SearchBar suggestionData={tickerName} onSelect={handleSearchBar} />
        <DateFilter onChange={handleDateFilter} />
      </div>
      <div className=" flex gap-x-3">
        <button
          onClick={() => handleSubmit()}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <SearchIcon sx={{ color: "white", fontSize: 20 }} />
          Tìm kiếm
        </button>
        <button
          onClick={() => onReset(true)}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default BuysellSearch;
