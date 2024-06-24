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

function BangDienHeader() {
  const [indexData, setIndexData] = useState([]);
  const data = [
    { name: "ALL", displayName: "TẤT CẢ" },
    { name: "VNIndex", displayName: "VNINDEX" },
    { name: "VN30", displayName: "VN30" },
    { name: "HNXIndex", displayName: "HNX" },
    { name: "HNX30", displayName: "HNX30" },
    { name: "HNXUpcomIndex", displayName: "UPCOM" },
  ];
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
    <div className="flex items-center justify-evenly w-full h-full overflow-x-scroll">
      {indexData?.map((item, index) => (
        <React.Fragment key={index}>
          <div className=" ">
            <IndexCard data={item} />
          </div>
          {index < indexData.length - 1 && (
            <div className=" h-2/3 min-w-0.5 bg-slate-700 "></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default BangDienHeader;
