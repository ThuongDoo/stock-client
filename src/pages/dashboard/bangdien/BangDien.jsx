import React, { useEffect, useState } from "react";
import BangDienHeader from "./components/BangDienHeader";
import TabBar from "../../../components/TabBar";
import BangDienStockBoard from "./components/BangDienStockBoard";
import Favorite from "./components/Favorite";
import api, { endpoints } from "../../../utils/api";

function BangDien() {
  const [categories, setCategories] = useState([]);
  const [securities, setSecurities] = useState([]);
  const [isReload, setisReload] = useState(false);

  const indexList = [
    { name: "ALL", displayName: "TẤT CẢ" },
    { name: "VNIndex", displayName: "VNINDEX" },
    { name: "VN30", displayName: "VN30" },
    { name: "HNXIndex", displayName: "HNX" },
    { name: "HNX30", displayName: "HNX30" },
    { name: "HNXUpcomIndex", displayName: "UPCOM" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.CATEGORY)
        .then((res) => {
          const data = res.data.map((categoryItem) => {
            const securityData = categoryItem.Securities.map((securityItem) => {
              return securityItem.Symbol;
            }).join(",");
            return {
              id: categoryItem.id,
              name: categoryItem.name,
              securities: securityData,
            };
          });
          data.unshift({ id: "", name: "TẤT CẢ" });
          setCategories(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    const fetchSecurities = async () => {
      await api
        .get(endpoints.SSI_SECURITY)
        .then((res) => {
          setSecurities(res.data.data);
        })
        .catch((e) => console.log(e));
    };
    fetchSecurities();

    fetchData();
  }, [isReload]);

  const handleReload = () => {
    setisReload(!isReload);
  };

  return (
    <div className=" flex flex-col h-screen p-4 gap-y-4 ">
      <div className=" ">
        <BangDienHeader data={indexList} />
      </div>
      <div className=" flex w-full flex-grow h-0 gap-x-4">
        <div className=" w-1/5 bg-slate-800 p-2 rounded-lg">
          <Favorite categories={categories} securities={securities} />
        </div>
        <div className=" w-4/5 bg-slate-800 p-2 rounded-lg">
          <BangDienStockBoard
            tabs={indexList}
            categories={categories}
            securities={securities}
            onReload={handleReload}
          />
        </div>
      </div>
    </div>
  );
}

export default BangDien;
