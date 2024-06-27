import React, { useEffect, useState } from "react";
import SearchBar from "../../../../components/SearchBar";
import DateFilter from "../../../../components/DateFilter";
import api, { endpoints } from "../../../../utils/api";
import moment from "moment";

function sortByTickerLengthAscending(data) {
  return data.sort((a, b) => a.length - b.length);
}

function BuysellSearch({ onSubmit, onReset }) {
  const [tickerName, setTickerName] = useState([]);
  useEffect(() => {
    const fetchTickerName = async () => {
      await api
        .get(endpoints.STOCK_GET_ALL)
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
    onSubmit({ ticker: value });
  };

  const handleDateFilter = (value) => {
    onSubmit({ date: moment(value).toISOString() });
  };

  const handleReset = () => {
    // setSelectedDate(null);
    // setSelectedTicker(null);
    onReset(true);
  };

  return (
    <div className=" flex flex-col gap-y-3 lg:flex-row gap-x-3">
      <div className=" flex flex-col sm:flex-row gap-x-3 gap-y-3 sm:items-center ">
        <SearchBar suggestionData={tickerName} onSelect={handleSearchBar} />
        <DateFilter onChange={handleDateFilter} />
      </div>
      <div className=" flex gap-x-3">
        <button
          onClick={() => handleReset()}
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default BuysellSearch;
