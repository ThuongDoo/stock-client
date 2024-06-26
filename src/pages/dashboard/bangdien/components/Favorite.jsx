import React, { useEffect, useRef, useState } from "react";
import { endpoints } from "../../../../utils/api";
import api from "../../../../utils/api";
import { EVENTS, socket } from "../../../../utils/socket";
import StockBD from "./StockBD";
import SortIcon from "@mui/icons-material/Sort";
import SearchBar from "../../../../components/SearchBar";
import { useSelector } from "react-redux";
import { getUser } from "../../../../slices/userSlice";
import UnauthorizedException from "../../../../components/UnauthorizedException";

function Favorite({ isParentReload }) {
  const [isAsc, setIsAsc] = useState(true);
  const [mySecurities, setMySecurities] = useState([]);
  const [isReload, setIsReload] = useState(isParentReload);
  const [stockBoardData, setStockBoardData] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector(getUser);
  const emitInterval = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.USER_SECURITY + `/${user.phone}`)
        .then((res) => {
          const myData = res.data.data
            .map((item) => {
              return item.Symbol;
            })
            .join(",");
          setMySecurities(myData);
        })
        .catch((e) => {
          setError(e?.response?.status);
        });
    };
    fetchData();
    return () => {};
  }, [isReload, isParentReload, user.phone]);

  useEffect(() => {
    socket.on(EVENTS.SSI_FAVORITE_UPDATE, (tradeData) => {
      try {
        const newData = JSON.parse(tradeData.data);
        setStockBoardData(newData);
      } catch (error) {}
    });
    const emitTradeRequest = () => {
      if (mySecurities.length > 0)
        socket.emit(EVENTS.SSI_FAVORITE_REQUEST, mySecurities);
    };
    emitTradeRequest();

    // Start the interval for emitting the request
    emitInterval.current = setInterval(emitTradeRequest, 2000);
    return () => {
      socket.off(EVENTS.SSI_FAVORITE_UPDATE);
      if (emitInterval.current) {
        clearInterval(emitInterval.current);
      }
    };
  }, [mySecurities]);

  const handleSearch = async (value) => {
    await api
      .post(endpoints.USER_SECURITY + `/${user.phone}/${value}`)
      .then((res) => {
        setIsReload(!isReload);
      })
      .catch((e) => {
        setError(e?.response?.status);
      });
  };

  const handleReload = (value) => {
    setIsReload(!isReload);
  };
  return (
    <div className="flex flex-col h-full gap-y-2">
      <div className=" flex items-center justify-between gap-x-2">
        <button onClick={() => setIsAsc(!isAsc)} className="">
          <SortIcon
            sx={{
              color: "white",
              fontSize: 28,
              transform: isAsc === false && "scaleY(-1)",
              // backgroundColor: "blue",
            }}
          />
        </button>
        <h1 className="">THEO DÕI</h1>
        <div className=" h-full w-20">
          <SearchBar onSelect={handleSearch} placeholder="Thêm" />
        </div>
      </div>
      <div className=" flex-grow h-0">
        {error === 401 ? (
          <div className=" flex justify-center items-center w-full">
            <UnauthorizedException />
          </div>
        ) : (
          <StockBD
            data={stockBoardData}
            isAsc={isAsc}
            cols={1}
            onReload={handleReload}
          />
        )}
      </div>
    </div>
  );
}

export default Favorite;
