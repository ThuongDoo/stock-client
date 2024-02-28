import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";
import api from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";

function BuysellSearch({ onSubmit }) {
  const [tickerName, setTickerName] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    const fetchTickerName = async () => {
      console.log("reload");
      await api
        .get("/stock/getAll")
        .then((res) => {
          setTickerName(res.data);
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
    <div className=" flex gap-x-3">
      <SearchBar suggestionData={tickerName} onSelect={handleSearchBar} />
      <DateFilter onChange={handleDateFilter} />
      <button onClick={() => handleSubmit()}>
        {/* <SearchIcon sx={{ color: "white", fontSize: 20 }} /> */}
        Tìm kiếm
      </button>
    </div>
  );
}

export default BuysellSearch;
