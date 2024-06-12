import React, { useEffect, useRef, useState } from "react";
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

  const emitInterval = useRef(null);

  useEffect(() => {
    socket.on(EVENTS.SSI_MI_UPDATE, (indexData) => {
      try {
        const changedIndex = changeIndexName(JSON.parse(indexData.data), data);
        setIndexData(changedIndex);
      } catch (error) {}
    });
    const emitTradeRequest = () => {
      socket.emit(EVENTS.SSI_MI_REQUEST, indexIds);
    };
    emitTradeRequest();

    // Start the interval for emitting the request
    emitInterval.current = setInterval(emitTradeRequest, 2000);
    return () => {
      socket.off(EVENTS.SSI_MI_UPDATE);
      if (emitInterval.current) {
        clearInterval(emitInterval.current);
      }
    };
  }, []);
  return (
    <div className=" w-full h-full overflow-x-scroll">
      <div className="  items-center justify-between flex gap-x-6 ">
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
