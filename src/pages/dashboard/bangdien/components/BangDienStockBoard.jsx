import React, { useEffect, useRef, useState } from "react";
import TabBar from "../../../../components/TabBar";
import { endpoints } from "../../../../utils/api";
import api from "../../../../utils/api";
import { EVENTS, socket } from "../../../../utils/socket";
import StockBD from "./StockBD";
import SortIcon from "@mui/icons-material/Sort";
import SearchBar from "../../../../components/SearchBar";
import DropdownList from "../../../../components/DropdownList";
import lodash from "lodash";

const formatIndexSecurities = (data) => {
  const formattedData = {};
  data.forEach((item) => {
    formattedData[item.indexCode] = item.data.join(",");
  });
  return formattedData;
};

function BangDienStockBoard({
  tabs,
  categories,
  securities,
  onReload = () => {},
}) {
  const [indexSecurities, setIndexSecurities] = useState({});
  const [symbols, setSymbols] = useState([]);
  const [chosenSecurities, setChosenSecurities] = useState(null);
  const [stockBoardData, setStockBoardData] = useState([]);
  const [isAsc, setIsAsc] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const indexIds = tabs
    .slice(1)
    .map((item) => {
      return item.name;
    })
    .join(",");

  const emitInterval = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.SSI_SECURITY + `?indexes=${indexIds}`)
        .then((res) => {
          const formattedData = formatIndexSecurities(res.data.data);
          setIndexSecurities(formattedData);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    const formattedSymbols = securities.map((item) => item.Symbol);
    setSymbols(formattedSymbols);
  }, [securities]);

  useEffect(() => {
    socket.on(EVENTS.SSI_TRADE_UPDATE, (tradeData) => {
      try {
        setStockBoardData(JSON.parse(tradeData.data));
      } catch (error) {}
    });

    // Function to emit the socket event
    const emitTradeRequest = () => {
      socket.emit(EVENTS.SSI_TRADE_REQUEST, chosenSecurities);
    };
    emitTradeRequest();

    // Start the interval for emitting the request
    emitInterval.current = setInterval(emitTradeRequest, 2000);
    return () => {
      socket.off(EVENTS.SSI_TRADE_UPDATE);
      if (emitInterval.current) {
        clearInterval(emitInterval.current);
      }
    };
  }, [chosenSecurities]);

  useEffect(() => {
    onReload(isReload);
  }, [isReload]);

  const handleTabBar = (tab) => {
    setChosenSecurities(indexSecurities[tab.name]);
  };

  const handleSearch = (value) => {
    setChosenSecurities(value);
  };

  const handleCategoryChange = (value) => {
    setChosenSecurities(value.securities);
  };

  const handleReload = (value) => {
    setIsReload(!isReload);
  };

  return (
    <div className="flex flex-col h-full gap-y-2">
      <div className=" flex items-center gap-x-2">
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
        <div className=" w-3/5">
          <TabBar
            tabs={tabs}
            isHorizontal
            onTabClick={handleTabBar}
            style={{
              fontSize: "1rem",
              button: {
                padding: "2px",
                onActive: { boxShadow: "inset 0 -4px 0 0 white" },
              },
            }}
          />
        </div>
        <div className=" flex h-full gap-x-5">
          <DropdownList list={categories} onClick={handleCategoryChange} />
          <SearchBar onSelect={handleSearch} suggestionData={symbols} />
        </div>
      </div>
      <div className=" flex-grow h-0">
        <StockBD data={stockBoardData} isAsc={isAsc} onReload={handleReload} />
      </div>
    </div>
  );
}

export default BangDienStockBoard;
