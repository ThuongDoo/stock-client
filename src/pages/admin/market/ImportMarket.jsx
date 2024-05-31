import React, { useState } from "react";
import JsonReader from "../../../components/JsonReader";
import api, { endpoints } from "../../../utils/api";

function ImportMarket() {
  const handleReadFile = (value) => {
    const fetchData = async () => {
      await api
        .post(endpoints.MARKET_IMPORT, value)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
    console.log(value);
  };
  return (
    <div>
      <JsonReader onRead={handleReadFile} />
    </div>
  );
}

export default ImportMarket;
