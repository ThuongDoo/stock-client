import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocCoPhieuForm from "../components/forms/LocCoPhieuForm";
import { Field, Form, Formik } from "formik";
import api from "../utils/api";
import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/socket";

function LocCoPhieu() {
  const [buttonClicked, setButtonClicked] = useState(0);
  // const [checkedFilter, setCheckedFilter] = useState([]);
  const [checkedFilter, setCheckedFilter] = useState([]);
  const [result, setResult] = useState([]);
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
        filter: [
          {
            option: 0,
            suggest: [],
            displayName: "P/E",
            name: "P/E",
          },
          {
            option: 0,
            suggest: [],
            displayName: "P/B",
            name: "P/B",
          },
          {
            option: 0,
            suggest: [],
            displayName: "P/S",
            name: "P/S",
          },
          {
            option: 0,
            suggest: [],
            displayName: "EPS",
            name: "EPS",
          },
          {
            option: 0,
            suggest: [],
            displayName: "Hệ số Beta",
            name: "Beta",
          },
        ],
      },
      {
        group: "Lợi nhuận",
        filter: [
          {
            option: 0,
            suggest: [],
            displayName: "Biên lợi nhuận gộp",
            name: "Bienloinhuangop",
          },
          {
            option: 0,
            suggest: [],
            displayName: "Biên lợi nhuận hoạt động",
            name: "Bienloinhuanhoatdong",
          },
          {
            option: 0,
            suggest: [],
            displayName: "Lợi nhuận gộp trên mỗi cổ phiếu",
            name: "LNGtrenCP",
          },
          {
            option: 0,
            suggest: [],
            displayName: "ROA",
            name: "ROA (%)",
          },
          {
            option: 0,
            suggest: [],
            displayName: "ROE",
            name: "ROE (%)",
          },
        ],
      },
    ],
    PTKT: [
      {
        group: "Thông tin cơ bản",
        filter: [
          {
            option: 1,
            suggest: ["HSX", "HNX", "UPCOM"],
            displayName: "Niêm yết trên sàn",
            name: "San",
          },
          {
            option: 0,
            suggest: [10000, 100000, 200000, 500000],
            displayName: "Tổng số CP lưu hành",
            name: "TyleCPluuhanh",
          },
          {
            option: 0,
            suggest: [10000, 100000, 200000, 500000],
            displayName: "Khối lượng giao dịch",
            name: "Volume",
          },
          {
            option: 0,
            suggest: [10000, 100000, 200000, 500000],
            displayName: "Tỷ lệ Free - Float",
            name: "Free-Float",
          },
        ],
      },
      {
        group: "Xu hướng chính",
        filter: [
          {
            option: 2,
            suggest: null,
            displayName: "Uptrend",
            name: "Uptrend",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Downtrend",
            name: "Downtrend",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Sideway",
            name: "Sideway",
          },
        ],
      },
      {
        group: "Tín hiệu kỹ thuật",
        filter: [
          {
            option: 2,
            suggest: null,
            displayName: "SEPA (Mark Minervini)",
            name: "PPSEPA",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Cổ phiếu cạn cung",
            name: "NoSupply",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Shakeout (Rủ bỏ)",
            name: "Shakeoutconfirmed",
          },
          {
            option: 0,
            suggest: [20, 80],
            displayName: "Chỉ báo MFI(14)",
            name: "MFI",
          },
        ],
      },
      {
        group: "Chỉ số sức mạnh RS",
        filter: [
          {
            option: 0,
            suggest: [30, 70],
            displayName: "RSI(14)",
            name: "RSI",
          },
          {
            option: 0,
            suggest: [70],
            displayName: "RS Rating (Mark Minervini) ",
            name: "RSRating",
          },
          {
            option: 0,
            suggest: [70],
            displayName: "RS O'neil",
            name: "RS-O'neil",
          },
        ],
      },
      {
        group: "Tín hiệu MACD",
        filter: [
          {
            option: 0,
            suggest: [0],
            displayName: "MACD tọa độ",
            name: "MACD",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Đường MACD Cắt lên",
            name: "MACDcatlen",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Đường MACD Cắt xuống",
            name: "MACDcatxuong",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Đường MACD Nằm trên",
            name: "MACDnamtren",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Đường MACD Nằm dưới",
            name: "MACDnamduoi",
          },
        ],
      },
      {
        group: "Chỉ báo ADX(14)",
        filter: [
          {
            option: 0,
            suggest: [20, 40, 50, 70],
            displayName: "ADX(14)",
            name: "ADX",
          },
          {
            option: 0,
            suggest: [20],
            displayName: "DMI+",
            name: "DMI",
          },
          {
            option: 0,
            suggest: [20, 80],
            displayName: "DMI-",
            name: "DMI-",
          },
        ],
      },
      {
        group: "Bolinger Band",
        filter: [
          {
            option: 2,
            suggest: null,
            displayName: "Bolinger Band chạm trên",
            name: "ChamdaitrenBB",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Bolinger Band chạm dưới",
            name: "ChamdaiduoiBB",
          },
        ],
      },
      {
        group: "Giá nằm trên đường đường SMA",
        filter: [
          {
            option: 2,
            suggest: null,
            displayName: "SMA (10)",
            name: "MA10",
          },
          {
            option: 2,
            suggest: null,
            displayName: "SMA (20)",
            name: "MA20",
          },
          {
            option: 2,
            suggest: null,
            displayName: "SMA (50)",
            name: "MA50",
          },
          {
            option: 2,
            suggest: null,
            displayName: "SMA (100)",
            name: "MA100",
          },
          {
            option: 2,
            suggest: null,
            displayName: "SMA (200)",
            name: "MA200",
          },
        ],
      },
      {
        group: "Giá 52 tuần",
        filter: [
          {
            option: 2,
            suggest: null,
            displayName: "Cao nhất",
            name: "GiaCaoNhat52W",
          },
          {
            option: 2,
            suggest: null,
            displayName: "Thấp nhất",
            name: "GiaThapHon52W",
          },
        ],
      },
    ],
  };

  const flattenedFilters = Object.values(filterValue).flatMap((group) =>
    group.flatMap((filterGroup) => filterGroup.filter)
  );

  const objectFilters = {};

  flattenedFilters.forEach((obj) => {
    if (obj.option === 0) {
      objectFilters[obj.name] = {
        ...obj,
        condition: ">",
        value: "",
        isChecked: false,
      };
    } else if (obj.option === 1) {
      objectFilters[obj.name] = {
        ...obj,
        value: obj.suggest,
        isChecked: false,
      };
    } else if (obj.option === 2) {
      objectFilters[obj.name] = { ...obj, value: 1, isChecked: false };
    }
  });

  const [filters, setFilters] = useState(objectFilters);

  useEffect(() => {
    const newFilter = filters;

    for (let key in newFilter) {
      if (checkedFilter.some((itemB) => itemB === newFilter[key].name)) {
        newFilter[key].isChecked = true;
      } else {
        newFilter[key].isChecked = false;
      }
    }
    setFilters(newFilter);
    console.log("set");
  }, [checkedFilter]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("stockUpdated", (newData) => {
      socket.emit("updateFilterRequest", filters);
    });
    socket.on("updateFilter", (newData) => {
      console.log("upda");
      setResult(newData.data);
    });

    const fetchData = async () => {
      await api
        .post(`/stock/filter`, filters)
        .then((res) => {
          setResult(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    console.log("fetch");
    fetchData();

    return () => {
      socket.disconnect();
    };
  }, [filters, checkedFilter]);

  const FilterComponent = ({ data, label }) => {
    const handleSubmit = (values) => {
      setCheckedFilter(values.checked);
    };
    return (
      <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50">
        <div
          className=" w-full h-full"
          onClick={() => setButtonClicked(0)}
        ></div>
        <div className=" bg-slate-900  absolute w-3/4 h-3/4 flex flex-col rounded-xl  drop-shadow-glow">
          <div className=" flex justify-between items-center  px-3 py-1 border-b border-slate-700 ">
            <h1>{label}</h1>
            <button
              className=" flex hover:bg-gray-500"
              onClick={() => setButtonClicked(0)}
            >
              <CloseIcon sx={{ fontSize: 20, color: "white" }} />
            </button>
          </div>
          <div className=" overflow-y-scroll m-3">
            <LocCoPhieuForm
              data={data[label]}
              onSubmit={handleSubmit}
              checkedValues={checkedFilter}
            />
          </div>
        </div>
      </div>
    );
  };

  const DieuKieuLocForm = () => {
    const data = filters;

    const handleSubmit = async (values) => {
      setFilters(values);
      console.log(values);
    };

    const handleDelete = async (deletedItem) => {
      console.log(checkedFilter);
      console.log(deletedItem);
      const newCheckedFilter = checkedFilter.filter(
        (item) => item != deletedItem
      );
      // console.log(newCheckedFilter);
      setCheckedFilter(newCheckedFilter);
    };

    return (
      <Formik initialValues={data} onSubmit={handleSubmit} enableReinitialize>
        {({ submitForm, handleChange, values }) => (
          <Form className=" flex flex-col h-full">
            <div className=" flex-1 overflow-y-scroll">
              {Object.values(data)
                .filter((item) => item.isChecked === true)
                .map((item) => (
                  <div
                    key={item.name}
                    className=" flex w-full justify-between  items-center gap-x-2"
                  >
                    <div className=" flex items-center w-full bg-slate-800 px-2 py-1 rounded-sm">
                      <h1 className="  w-1/5 text-left font-semibold">
                        {item.displayName}
                      </h1>
                      {item.option === 0 ? (
                        <div className=" text-black flex gap-x-3 ">
                          <Field
                            onChange={(e) => {
                              handleChange(e);
                              submitForm();
                            }}
                            as="select"
                            name={`${item.name}.condition`}
                          >
                            <option value=">=">Lớn hơn</option>
                            <option value="<=">Bé hơn</option>
                            <option value="=">Bằng</option>
                            <option value="range">Khoảng</option>
                          </Field>
                          {item.condition === "range" ? (
                            <div>
                              {delete item.value}
                              <Field
                                name={`${item.name}.value1`}
                                type="number"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                              <Field
                                name={`${item.name}.value2`}
                                type="number"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                            </div>
                          ) : (
                            <div className=" flex items-center">
                              {delete item.value1}
                              {delete item.value2}
                              <Field
                                list={item.name}
                                name={`${item.name}.value`}
                                type="number"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                              />
                              <datalist id={item.name}>
                                {item.suggest.map((suggestItem) => (
                                  <option key={suggestItem} value={suggestItem}>
                                    {suggestItem}
                                  </option>
                                ))}
                              </datalist>
                            </div>
                          )}
                        </div>
                      ) : (
                        item.option === 1 && (
                          <div className=" flex gap-x-2 items-center ">
                            {item.suggest.map((suggestItem, index) => (
                              <label
                                key={index}
                                className="text-left flex gap-x-1 items-center"
                              >
                                <Field
                                  type="checkbox"
                                  name={item.name}
                                  value={suggestItem}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <h1 className="">{suggestItem}</h1>
                              </label>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                    <CloseIcon
                      sx={{ color: "white", fontSize: 20 }}
                      className=" hover:bg-blue-500 rounded-sm"
                      onClick={() => {
                        handleDelete(item.name);
                      }}
                    />
                  </div>
                ))}
            </div>
            <div className="  flex gap-x-4 justify-end items-center">
              <button
                onClick={() => {
                  setButtonClicked(1);
                  setFilters(values);
                }}
                className=" border rounded-lg px-3"
              >
                PTCB
              </button>
              <button
                onClick={() => {
                  setButtonClicked(2);
                  setFilters(values);
                }}
                className=" border rounded-lg px-3"
              >
                PTKT
              </button>
              <button className=" border rounded-lg px-3" type="submit">
                Tìm kiếm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    // <div className=" flex items-center justify-center w-full h-full">
    //   <h1>Tính năng sắp ra mắt</h1>
    // </div>
    <div className=" flex flex-col h-screen">
      {buttonClicked === 1 ? (
        <FilterComponent data={filterValue} label="PTCB" />
      ) : (
        buttonClicked === 2 && (
          <FilterComponent data={filterValue} label="PTKT" />
        )
      )}
      <div className="   h-1/2 bg-slate-900">
        <DieuKieuLocForm />
      </div>
      <div className="  h-1/2  flex-grow overflow-auto border">
        {result.length > 0 ? (
          <table className=" dark:text-white relative w-full   ">
            <thead className=" bg-slate-900 sticky top-0">
              <tr className=" ">
                <th className=" px-4 py-2">STT</th>
                <th className=" px-4 py-2">Mã</th>
                <th className=" px-4 py-2">Sàn</th>
                <th className=" px-4 py-2">Giá</th>
                <th className=" px-4 py-2">+/-</th>
                <th className=" px-4 py-2">%</th>
                <th className=" px-4 py-2">Volume</th>
              </tr>
            </thead>
            <tbody
              className="bg-grey-light divide-y"
              style={{ height: "50vh" }}
            >
              {result?.map((stock, index) => (
                <tr
                  key={index}
                  className={` ${
                    index % 2 === 1 ? "dark:bg-slate-900 bg-neutral-200" : ""
                  }  border border-slate-700 `}
                >
                  <td>{index + 1}</td>
                  <td>{stock?.Ticker}</td>
                  <td>{stock?.San}</td>
                  <td>{stock?.Giahientai}</td>
                  <td>{stock["Tang/Giam"]}</td>

                  <td>{stock["Tang/Giam (%)"]}</td>
                  <td>{stock?.Volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Không tìm thấy dữ liệu</div>
        )}
      </div>
    </div>
  );
}

export default LocCoPhieu;
