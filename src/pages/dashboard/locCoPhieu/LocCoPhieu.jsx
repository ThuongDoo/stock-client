import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LocCoPhieuForm from "./components/LocCoPhieuForm";
import { Field, Form, Formik } from "formik";
import api from "../../../utils/api";
import CustomTable from "../../../components/CustomTable";
import UnauthorizedException from "../../../components/UnauthorizedException";
import LocCoPhieuSkeleton from "../../../skeletons/LocCoPhieuSkeleton";
import Loading from "../../../skeletons/Loading";
import { EVENTS, socket } from "../../../utils/socket";

function LocCoPhieu() {
  const [buttonClicked, setButtonClicked] = useState(0);
  const [error, setError] = useState(null);
  // const [checkedFilter, setCheckedFilter] = useState([]);
  const [checkedFilter, setCheckedFilter] = useState([]);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const updateResult = (data) => {
    const tempData = data.map((item, index) => {
      return {
        ...item,
        id: index + 1,
        "Tang/Giam": Number(item["Tang/Giam"]),
        "Tang/Giam (%)": Number(item["Tang/Giam (%)"]),
      };
    });
    setResult(tempData);
    setIsLoading(false);
  };

  const flattenedFilters = Object.values(filterValue).flatMap((group) =>
    group.flatMap((filterGroup) => filterGroup.filter)
  );

  const objectFilters = {};

  flattenedFilters.forEach((obj) => {
    if (obj.option === 0) {
      objectFilters[obj.name] = {
        ...obj,
        condition: ">=",
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
    console.log("setfire");
  }, [checkedFilter]);

  useEffect(() => {
    socket.on(EVENTS.NEW_STOCK_DATA_AVAILABLE, (newData) => {
      socket.emit(EVENTS.FILTERD_STOCK_REQUEST, filters);
    });
    socket.on(EVENTS.UPDATE_FILTERED_STOCK_DATA, (newData) => {
      updateResult(newData.data);
    });

    const fetchData = async () => {
      console.log("fetch");
      setIsLoading(true);
      await api
        .post(`/stock/filter`, filters)
        .then((res) => {
          console.log("load");
          updateResult(res.data);
        })
        .catch((err) => {
          setError(err.response.status);
        });
    };
    fetchData();

    return () => {
      socket.off(EVENTS.NEW_STOCK_DATA_AVAILABLE);
      socket.off(EVENTS.UPDATE_FILTERED_STOCK_DATA);
    };
  }, [filters, checkedFilter]);

  const FilterComponent = ({ data, label }) => {
    const [tempValue, setTempValue] = useState([]);
    const handleSubmit = (values) => {
      setTempValue(values.checked);
    };

    return (
      <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50">
        <div
          className=" w-full h-full"
          onClick={() => {
            setButtonClicked(0);
            if (tempValue.length > 0) {
              setCheckedFilter(tempValue);
            }
          }}
        ></div>
        <div className=" dark:bg-slate-900 bg-neutral-200 text-black dark:text-white  absolute w-3/4 h-3/4 flex flex-col rounded-xl  drop-shadow-glow">
          <div className=" flex justify-between items-center  px-3 py-1 border-b border-slate-700 ">
            <h1>{label}</h1>
            <button
              className=" flex hover:bg-blue-500"
              onClick={() => {
                setButtonClicked(0);
                if (tempValue.length > 0) {
                  setCheckedFilter(tempValue);
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
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
    };

    const handleDelete = async (deletedItem) => {
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
            <div className=" flex flex-col sm:flex-row px-4 py-1 dark:text-white text-black  gap-x-4 gap-y-2 items-center">
              <h1 className=" text-left font-semibold">Điều kiện lọc</h1>

              <div className="  flex gap-x-4 items-center">
                <button
                  onClick={() => {
                    setButtonClicked(1);
                    setFilters(values);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
                >
                  PTCB
                </button>
                <button
                  onClick={() => {
                    setButtonClicked(2);
                    setFilters(values);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
                >
                  PTKT
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
                  type="submit"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
            <div className=" flex-1 overflow-y-scroll space-y-0.5 py-2">
              {Object.values(data)
                .filter((item) => item.isChecked === true)
                .map((item) => (
                  <div
                    key={item.name}
                    className=" flex w-full justify-between  items-center gap-x-2 text-sm px-2"
                  >
                    <div className=" flex items-center w-full dark:bg-slate-800 bg-white px-2 py-1 rounded-md">
                      <h1 className=" w-1/3 text-left font-semibold">
                        {item.displayName}
                      </h1>
                      {item.option === 0 ? (
                        <div className=" dark:text-white text-black flex gap-x-3">
                          <Field
                            onChange={(e) => {
                              handleChange(e);
                              submitForm();
                            }}
                            as="select"
                            name={`${item.name}.condition`}
                            className=" dark:bg-slate-900 bg-white  border border-slate-600 rounded-md px-2 py-0.5"
                          >
                            <option value=">=">Lớn hơn</option>
                            <option value="<=">Bé hơn</option>
                            <option value="=">Bằng</option>
                            <option value="range">Khoảng</option>
                          </Field>
                          {item.condition === "range" ? (
                            <div className=" space-x-2">
                              {delete item.value}
                              <Field
                                name={`${item.name}.value1`}
                                type="number"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                className=" dark:bg-slate-900 bg-white  border border-slate-600 rounded-md px-2 py-0.5"
                              />
                              <Field
                                name={`${item.name}.value2`}
                                type="number"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                className=" dark:bg-slate-900 bg-white  border border-slate-600 rounded-md px-2 py-0.5"
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
                                className=" dark:bg-slate-900 bg-white  border border-slate-600 rounded-md px-2 py-0.5"
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
                                  name={`${item.name}.value`}
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
                      sx={{ fontSize: 20 }}
                      className=" hover:bg-blue-500 rounded-sm dark:text-white text-black"
                      onClick={() => {
                        handleDelete(item.name);
                      }}
                    />
                  </div>
                ))}
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  const columns = [
    {
      field: "id",
      headerName: "STT",
      type: "center",
      flex: 0.5, // headerClassName: "bg-blue-500",
      minWidth: 80,
      visible: true,
    },
    {
      field: "Ticker",
      headerName: "Mã",
      // headerClassName: "bg-blue-500",
      onClick: true,
      flex: 1,
      minWidth: 120,
      visible: true,
    },
    {
      field: "San",
      headerName: "Sàn",
      minWidth: 120,
      flex: 1,
      // headerClassName: "bg-blue-500",
      visible: true,
    },
    {
      field: "Giahientai",
      headerName: "Giá",
      type: "right",
      // headerClassName: "bg-blue-500",
      minWidth: 120,
      visible: true,
      flex: 1,
    },
    {
      field: "Tang/Giam",
      headerName: "+/-",
      type: "right",
      minWidth: 120,
      visible: true,
      flex: 1,
    },
    {
      field: "Tang/Giam (%)",
      headerName: "%",
      type: "right",
      // hideable: false,
      minWidth: 120,
      visible: true,
      // filterable: false,
      flex: 1,
    },
    {
      field: "Volume",
      headerName: "Volume",
      // headerClassName: "bg-blue-500",
      type: "right",
      minWidth: 200,
      visible: true,
      flex: 1,
    },
    {
      field: "RSRating",
      headerName: "RS Rating",
      // headerClassName: "bg-blue-500",
      type: "right",
      visible: false,
      minWidth: 120,
      flex: 1,
    },
    {
      field: "RS-O'neil",
      headerName: "RS O'neil",
      // headerClassName: "bg-blue-500",
      type: "right",
      minWidth: 120,
      visible: false,
      flex: 1,
    },
    {
      field: "RSI",
      headerName: "RSI(14)",
      // headerClassName: "bg-blue-500",
      type: "right",
      visible: false,
      minWidth: 120,
      flex: 1,
    },
    {
      field: "ADX",
      headerName: "ADX(14)",
      // headerClassName: "bg-blue-500",
      type: "right",
      visible: false,
      minWidth: 120,
      flex: 1,
    },
    {
      field: "DMI ",
      headerName: "DMI+",
      // headerClassName: "bg-blue-500",
      type: "right",
      visible: false,
      minWidth: 120,
      flex: 1,
    },
    {
      field: "DMI-",
      headerName: "DMI-",
      // headerClassName: "bg-blue-500",
      type: "right",
      minWidth: 120,
      visible: false,
      flex: 1,
    },
  ];

  return (
    <div className=" flex flex-col h-screen p-2 gap-y-2">
      {buttonClicked === 1 ? (
        <FilterComponent data={filterValue} label="PTCB" />
      ) : (
        buttonClicked === 2 && (
          <FilterComponent data={filterValue} label="PTKT" />
        )
      )}
      <div className=" h-1/3 dark:bg-slate-900 bg-neutral-200">
        <DieuKieuLocForm />
      </div>
      <div className=" h-2/3 ">
        {isLoading === true ? (
          <Loading />
        ) : (
          <CustomTable rows={result} columns={columns} />
        )}
      </div>
      {error === 401 && <UnauthorizedException />}
    </div>
  );
}

export default LocCoPhieu;
