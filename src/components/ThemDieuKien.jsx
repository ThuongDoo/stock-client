import React, { useEffect, useState } from "react";
import Analysis from "./forms/Analysis";
import TabBar from "./TabBar";

function ThemDieuKien({ onChange, data }) {
  const [TrangThaiPhanTich, setTrangThaiPhanTich] = useState("PTCB");
  const [filterArray, setFilterArray] = useState([]);
  const tabs = data.tabs;
  const filters = data.filters;

  const addToFilterArray = (newArray) => {
    const newFilterArray = [...filterArray];
    for (const filter of newArray) {
      if (filter.isChosen === true) {
        if (filterArray.some((item) => item.name === filter.name)) {
          // console.log("hah");
        } else {
          const newFilter = filters[TrangThaiPhanTich].find(
            (item) => item.name === filter.name
          );

          newFilterArray.push(newFilter);
        }
      }
    }
    setFilterArray(newFilterArray);
  };

  const handleSubmit = (values) => {
    console.log(values);
    const newArray = Object.entries(values).map(([name, isChosen]) => ({
      name,
      isChosen,
    }));
    addToFilterArray(newArray);
  };

  useEffect(() => {
    onChange(filterArray);
  }, [filterArray]);

  return (
    <div className=" flex flex-col h-full">
      <TabBar tabs={tabs} onTabClick={(tab) => setTrangThaiPhanTich(tab)} />
      <div className=" overflow-scroll">
        <Analysis
          filters={filters[TrangThaiPhanTich]}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ThemDieuKien;
