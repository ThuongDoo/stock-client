import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { CATEGORIES } from "../constants/categories";
import SideBarBD from "../components/SideBarBD";
import StockBD from "../components/StockBD";

function BangDien() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(CATEGORIES.NGAN_HANG);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/board/bangdien/${category}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
      console.log("reload");
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    // Xử lý khi component unmount, clear interval để ngăn không gọi fetchData nữa
    return () => clearInterval(intervalId);
  }, [category]);

  const handleDataFromSideBar = (value) => {
    setCategory(value);
  };
  return (
    <div className=" flex">
      <SideBarBD onClick={handleDataFromSideBar} />
      <StockBD data={data} />
    </div>
  );
}

export default BangDien;
