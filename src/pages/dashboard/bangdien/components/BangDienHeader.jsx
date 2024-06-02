import React, { useEffect, useState } from "react";
import { EVENTS, socket } from "../../../../utils/socket";
import IndexCard from "../../../../components/IndexCard";

function BangDienHeader() {
  const [indexData, setIndexData] = useState([]);
  const indexIds = ["VN30", "VN100", "VNIndex", "VNUTI", "VNX50", "HNX30"];
  useEffect(() => {
    socket.emit(EVENTS.SSI_MI_REQUEST, indexIds.join(","));
    socket.on(EVENTS.SSI_MI_UPDATE, (data) => {
      setIndexData(data.data);
      console.log(data.data);
    });
    return () => {
      socket.off(EVENTS.SSI_MI_UPDATE);
    };
  }, []);

  return (
    <div className=" w-full h-full">
      <div className="  items-center grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-x-2 lg:gap-x-8">
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
