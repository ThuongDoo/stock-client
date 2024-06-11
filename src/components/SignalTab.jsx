import React, { useEffect, useState } from "react";
import api, { endpoints } from "../utils/api";

function SignalTab({ symbol }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.BUYSELL + `?ticker=${symbol}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  return (
    <div className=" h-full flex border border-gray-500 divide-x divide-white">
      <div className=" w-9/12"></div>
      <div className=" w-3/12 bg-slate-600">
        <div className=" flex flex-col p-2 gap-y-2">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SignalTab;
