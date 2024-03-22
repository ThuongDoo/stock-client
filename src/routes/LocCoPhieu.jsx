import React, { useState } from "react";
import ThemDieuKien from "../components/ThemDieuKien";
import DieuKienLoc from "../components/DieuKienLoc";
import CloseIcon from "@mui/icons-material/Close";

function LocCoPhieu() {
  const [buttonClicked, setButtonClicked] = useState(0);
  let stockData = {
    ADX: "33.80",
    Beta: "1.01",
    Bienloinhuangop: "1.11",
    Bienloinhuanhoatdong: "1.39",
    BookValuePerShare: "22.97",
    ChamdaiduoiBB: "0",
    ChamdaitrenBB: "1",
    DMI: "32.34",
    "DMI-": "16.61",
    DTtrenCP: "215.85",
    "Date/Time": "2024-03-21",
    "Dividend Yield (%)": "1.82",
    EPS: "2.21",
    "Free-Float": "108523192.00",
    GiaCaoNhat52W: "0",
    GiaThapHon52W: "0",
    Giahientai: "38.40",
    GiatriGD: "89752322048",
    LNGtrenCP: "12.00",
    MA10: "1",
    MA15: "1",
    MA20: "1",
    MA50: "1",
    MA100: "1",
    MA200: "1",
    MACD: "0.63",
    MACDcatlen: "0",
    MACDcatxuong: "0",
    MACDnamduoi: "0",
    MACDnamtren: "1",
    MFI: "79.64",
    NoSupply: "0",
    OCF: "1696520077312.00",
    "P/B": "1.67",
    "P/CF": "0.03",
    "P/E": "17.35",
    "P/S": "0.18",
    PPSEPA: "0",
    "Phan loai Cp": "Co phieu",
    Pivotspocket: "0",
    "ROA (%)": "3.67",
    "ROE (%)": "9.87",
    "RS-O'neil": "19",
    RSI: "65.68",
    RSRating: "93.02",
    San: "HSX",
    Shakeoutconfirmed: "0",
    Sideway: "1",
    "Tang/Giam": "0.95",
    "Tang/Giam (%)": "2.54",
    TangtruongLNhangquy: "-45.12",
    Tangtruongdoanhthutheoquy: "-9.80",
    Ticker: "PLX",
    Trend: "0",
    TyleCPluuhanh: "1270592256.00",
    Volume: "2337300",
  };

  const filterValue = {
    PTCB: [
      {
        group: "Định giá",
        filter: {
          "P/E": {
            option: 0,
            suggest: null,
            name: "P/E",
          },
          "P/B": {
            option: 0,
            suggest: null,
            name: "P/B",
          },
          "P/S": {
            option: 0,
            suggest: null,
            name: "P/S",
          },
          EPS: {
            option: 0,
            suggest: null,
            name: "EPS",
          },
          Beta: {
            option: 0,
            suggest: null,
            name: "Hệ số Beta",
          },
        },
      },
      {
        group: "Lợi nhuận",
        filter: {
          Bienloinhuangop: {
            option: 0,
            suggest: null,
            name: "Biên lợi nhuận gộp",
          },
          Bienloinhuanhoatdong: {
            option: 0,
            suggest: null,
            name: "Biên lợi nhuận hoạt động",
          },
          LNGtrenCP: {
            option: 0,
            suggest: null,
            name: "Lợi nhuận gộp trên mỗi cổ phiếu",
          },
          "ROA (%)": {
            option: 0,
            suggest: null,
            name: "ROA",
          },
          "ROE (%)": {
            option: 0,
            suggest: null,
            name: "ROE",
          },
        },
      },
    ],
    PTKT: [
      {
        group: "Thông tin cơ bản",
        filter: {
          San: {
            option: 1,
            suggest: ["HSX", "HNX", "UPCOM"],
            name: "Niêm yết trên sàn",
          },
          TyleCPluuhanh: {
            option: 0,
            suggest: null,
            name: "Tổng số CP lưu hành",
          },
          Volume: {
            option: 0,
            suggest: [10000, 100000, 200000, 500000],
            name: "Khối lượng giao dịch",
          },
          "Free-Float": {
            option: 0,
            suggest: null,
            name: "Tỷ lệ Free - Float",
          },
        },
      },
      {
        group: "Xu hướng chính",
        filter: {
          Uptrend: {
            option: 3,
            suggest: [1],
            name: "Uptrend",
          },
          Downtrend: {
            option: 3,
            suggest: [0],
            name: "Downtrend",
          },
          Sideway: {
            option: 0,
            suggest: null,
            name: "Sideway",
          },
        },
      },
      {
        group: "Tín hiệu kỹ thuật",
        filter: {
          PPSEPA: {
            option: 2,
            suggest: null,
            name: "SEPA (Mark Minervini)",
          },
          NoSupply: {
            option: 2,
            suggest: null,
            name: "Cổ phiếu cạn cung",
          },
          Shakeoutconfirmed: {
            option: 2,
            suggest: null,
            name: "Shakeout (Rủ bỏ)",
          },
          MFI: {
            option: 0,
            suggest: [20, 80],
            name: "Chỉ báo MFI(14)",
          },
        },
      },
      {
        group: "Chỉ số sức mạnh RS",
        filter: {
          RSI: {
            option: 0,
            suggest: [30, 70],
            name: "RSI(14)",
          },
          RSRating: {
            option: 0,
            suggest: [70],
            name: "RS Rating (Mark Minervini) ",
          },
          "RS-O'neil": {
            option: 0,
            suggest: [70],
            name: "RS O'neil",
          },
        },
      },
      {
        group: "Tín hiệu MACD",
        filter: {
          MACD: {
            option: 0,
            suggest: [0],
            name: "MACD tọa độ",
          },
          MACDcatlen: {
            option: 1,
            suggest: null,
            name: "Đường MACD Cắt lên",
          },
          MACDcatxuong: {
            option: 1,
            suggest: null,
            name: "Đường MACD Cắt xuống",
          },
          MACDnamtren: {
            option: 1,
            suggest: null,
            name: "Đường MACD Nằm trên",
          },
          MACDnamduoi: {
            option: 1,
            suggest: null,
            name: "Đường MACD Nằm dưới",
          },
        },
      },
      {
        group: "Chỉ báo ADX(14)",
        filter: {
          ADX: {
            option: 0,
            suggest: [20, 40, 50, 70],
            name: "ADX(14)",
          },
          DMI: {
            option: 0,
            suggest: [20],
            name: "DMI+",
          },
          "DMI-": {
            option: 0,
            suggest: [20, 80],
            name: "DMI-",
          },
        },
      },
      {
        group: "Bolinger Band",
        filter: {
          ChamdaitrenBB: {
            option: 2,
            suggest: null,
            name: "Bolinger Band chạm trên",
          },
          ChamdaiduoiBB: {
            option: 2,
            suggest: null,
            name: "Bolinger Band chạm dưới",
          },
        },
      },
      {
        group: "Giá nằm trên đường đường SMA",
        filter: {
          MA10: {
            option: 2,
            suggest: null,
            name: "SMA (10)",
          },
          MA20: {
            option: 2,
            suggest: null,
            name: "SMA (20)",
          },
          MA50: {
            option: 2,
            suggest: null,
            name: "SMA (50)",
          },
          MA100: {
            option: 2,
            suggest: null,
            name: "SMA (100)",
          },
          MA200: {
            option: 2,
            suggest: null,
            name: "SMA (200)",
          },
        },
      },
      {
        group: "Giá 52 tuần",
        filter: {
          GiaCaoNhat52W: {
            option: 2,
            suggest: null,
            name: "Cao nhất",
          },
          GiaThapHon52W: {
            option: 2,
            suggest: null,
            name: "Thấp nhất",
          },
        },
      },
    ],
  };

  const FilterComponent = ({ label = "PTCK" }) => {
    return (
      <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full ">
        <div
          className=" w-full h-full"
          onClick={() => setButtonClicked(0)}
        ></div>
        <div className=" bg-green-500 absolute w-3/4 h-3/4 flex flex-col">
          <div className=" flex justify-between items-center bg-slate-900">
            <h1>{label}</h1>
            <button
              className=" flex hover:bg-gray-500"
              onClick={() => setButtonClicked(0)}
            >
              <CloseIcon sx={{ fontSize: 20, color: "white" }} />
            </button>
          </div>
          <div></div>
        </div>
      </div>
    );
  };

  return (
    <div className=" flex items-center justify-center w-full h-full">
      <h1>Tính năng sắp ra mắt</h1>
    </div>
    // <div className=" flex flex-col h-full">
    //   {buttonClicked === 1 ? (
    //     <FilterComponent />
    //   ) : (
    //     buttonClicked === 2 && <FilterComponent />
    //   )}
    //   <div className="   h-1/2 flex flex-col gap-y-3">
    //     <div className="  flex gap-x-4">
    //       <button
    //         onClick={() => setButtonClicked(1)}
    //         className=" border rounded-lg px-3"
    //       >
    //         PTCB
    //       </button>
    //       <button
    //         onClick={() => setButtonClicked(2)}
    //         className=" border rounded-lg px-3"
    //       >
    //         PTKT
    //       </button>
    //       <button className=" border rounded-lg px-3">Tìm kiếm</button>
    //     </div>
    //     <div className=" bg-blue-500 flex-1">dieu kien loc</div>
    //   </div>
    //   <div className=" bg-yellow-500 h-1/2">KET QUA</div>
    // </div>
  );
}

export default LocCoPhieu;
