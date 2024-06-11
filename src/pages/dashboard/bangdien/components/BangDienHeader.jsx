import React, { useEffect, useState } from "react";
import { EVENTS, socket } from "../../../../utils/socket";
import IndexCard from "../../../../components/IndexCard";

const changeIndexName = (data, nameList) => {
  const result = data.map((itemA) => {
    const itemB = nameList.find((item) => item.name === itemA.IndexId);
    return {
      ...itemA,
      IndexName: itemB.displayName,
    };
  });
  return result;
};

function BangDienHeader({ data }) {
  const [indexData, setIndexData] = useState([]);
  const indexIds = data
    .slice(1)
    .map((item) => {
      return item.name;
    })
    .join(",");
  useEffect(() => {
    socket.emit(EVENTS.SSI_MI_REQUEST, indexIds);
    socket.on(EVENTS.SSI_MI_UPDATE, (indexData) => {
      try {
        const changedIndex = changeIndexName(JSON.parse(indexData.data), data);
        setIndexData(changedIndex);
      } catch (error) {}
    });
    return () => {
      socket.off(EVENTS.SSI_MI_UPDATE);
    };
  }, []);
  return (
    <div className=" w-full h-full">
      <div className="  items-center grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-x-2 lg:gap-x-6">
        {indexData?.map((item, index) => (
          <div key={index} className="">
            <IndexCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BangDienHeader;
