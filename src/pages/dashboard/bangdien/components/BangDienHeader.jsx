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
  const tempData = [
    {
      IndexId: "HNXINDEX",
      IndexValue: 243.97,
      PriorIndexValue: 1301.51,
      TradingDate: "14/06/2024",
      Time: "15:02:04",
      TotalTrade: 622871,
      TotalQtty: 1009516769,
      TotalValue: 2136822576902,
      IndexName: "HNXINDEX",
      Advances: 56,
      NoChanges: 46,
      Declines: 139,
      Ceilings: 9,
      Floors: 9,
      Change: -4.39,
      RatioChange: -1.77,
      TotalQttyPt: 101120324,
      TotalValuePt: 2596676230980,
      Exchange: "HOSE",
      AllQty: 1110637093,
      AllValue: 2136822576902,
      IndexType: "Main",
      TradingSession: "C",
      MarketId: null,
      RType: "MI",
      TotalQttyOd: 0,
      TotalValueOd: 0,
    },
    {
      IndexId: "HNX30",
      IndexValue: 540.53,
      PriorIndexValue: 1301.51,
      TradingDate: "14/06/2024",
      Time: "15:02:04",
      TotalTrade: 622871,
      TotalQtty: 1009516769,
      TotalValue: 1720562769020,
      IndexName: "HNX30",
      Advances: 2,
      NoChanges: 3,
      Declines: 28,
      Ceilings: 0,
      Floors: 0,
      Change: -21.6,
      RatioChange: -1.66,
      TotalQttyPt: 101120324,
      TotalValuePt: 2596676230980,
      Exchange: "HOSE",
      AllQty: 1110637093,
      AllValue: 1720562769020,
      IndexType: "Main",
      TradingSession: "C",
      MarketId: null,
      RType: "MI",
      TotalQttyOd: 0,
      TotalValueOd: 0,
    },
    {
      IndexId: "VNIndex",
      IndexValue: 98.05,
      PriorIndexValue: 1301.51,
      TradingDate: "14/06/2024",
      Time: "15:02:04",
      TotalTrade: 622871,
      TotalQtty: 1009516769,
      TotalValue: 26765305769020,
      IndexName: "VNINDEX",
      Advances: 182,
      NoChanges: 101,
      Declines: 195,
      Ceilings: 47,
      Floors: 9,
      Change: -0.97,
      RatioChange: -0.98,
      TotalQttyPt: 101120324,
      TotalValuePt: 2596676230980,
      Exchange: "HOSE",
      AllQty: 1110637093,
      AllValue: 1633361000000,
      IndexType: "Main",
      TradingSession: "C",
      MarketId: null,
      RType: "MI",
      TotalQttyOd: 0,
      TotalValueOd: 0,
    },
  ];
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
        changedIndex.push(...tempData);
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
  console.log(indexData);
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
