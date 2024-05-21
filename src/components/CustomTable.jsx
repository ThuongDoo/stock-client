import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StockChart from "../pages/dashboard/locCoPhieu/components/StockChart";
import CloseIcon from "@mui/icons-material/Close";

const CustomTable = ({
  columns,
  rows,
  itemsPerPage = 20,
  maxVisiblePages = 7,
  checkboxesVisible = false,
  manageVisible = true,
  onCheckboxes,
}) => {
  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: null,
  });
  const [visibleColumns, setVisibleColumns] = useState(() =>
    columns.map((column) => ({
      ...column,
    }))
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [chosenTicker, setChosenTicker] = useState("ACB");

  const [checkboxes, setCheckboxes] = useState(new Array(5).fill(false));

  useEffect(() => {
    setCheckboxes(new Array(5).fill(false));
  }, [rows]);

  // Hàm xử lý khi checkbox thay đổi trạng thái
  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    onCheckboxes(newCheckboxes);
    setCheckboxes(newCheckboxes);
  };

  const handleHeaderCheckboxChange = () => {
    const allChecked = checkboxes.every((checkbox) => checkbox);
    onCheckboxes(new Array(rows.length).fill(!allChecked));
    setCheckboxes(new Array(rows.length).fill(!allChecked));
  };

  const handleSort = (field) => {
    let direction = "ascending";
    if (sortConfig.field === field && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.field === field &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
      field = null;
    }
    setSortConfig({ field, direction });
  };

  const sortedRows = () => {
    const sortableRows = [...rows];
    if (sortConfig.field) {
      sortableRows.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRows;
  };

  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const currentRows = sortedRows();

  const toggleColumnVisibility = (field) => {
    const updatedColumns = visibleColumns.map((column) =>
      column.field === field ? { ...column, visible: !column.visible } : column
    );
    setVisibleColumns(updatedColumns);
  };

  const renderTableHeader = () => (
    <thead className=" sticky top-0">
      <tr>
        {checkboxesVisible && (
          <th
            className="px-4 py-2 dark:bg-black bg-white cursor-pointer"
            onClick={handleHeaderCheckboxChange}
          >
            <input
              type="checkbox"
              checked={checkboxes.every((checkbox) => checkbox)}
              onChange={handleHeaderCheckboxChange}
              className="h-4 w-4 cursor-pointer"
            />
          </th>
        )}
        {visibleColumns.map(
          (column, index) =>
            column.visible && (
              <th
                key={index}
                className={` px-4 py-2 dark:bg-black bg-white cursor-pointer`}
                onClick={() => handleSort(column.field)}
                style={{ minWidth: column.minWidth + "px" }}
              >
                {column.headerName}
                {sortConfig.field === column.field && sortConfig.direction && (
                  <span className="ml-2">
                    {sortConfig.direction === "ascending" ? (
                      <ExpandLessIcon
                        sx={{ fontSize: 20 }}
                        className=" dark:text-white text-black"
                      />
                    ) : (
                      <ExpandMoreIcon
                        sx={{ fontSize: 20 }}
                        className=" dark:text-white text-black"
                      />
                    )}
                  </span>
                )}
              </th>
            )
        )}
      </tr>
    </thead>
  );

  const renderManageModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-64 text-black ">
        <h2 className="text-lg font-semibold mb-2">Manage Columns</h2>
        <ul>
          {columns.map((column, index) => (
            <li key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={column.field}
                checked={
                  visibleColumns.find((col) => col.field === column.field)
                    ?.visible
                }
                onChange={() => toggleColumnVisibility(column.field)}
                className="mr-2"
              />
              <label htmlFor={column.field}>{column.headerName}</label>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={() => setIsManageModalOpen(false)}
        >
          Save
        </button>
      </div>
    </div>
  );

  const renderChartModal = () => (
    <div className="bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50 ">
      <div
        className=" w-full h-full"
        onClick={() => {
          setIsChartModalOpen(false);
        }}
      ></div>
      <div className="dark:bg-slate-900 bg-neutral-200 text-black dark:text-white  absolute w-3/4 flex flex-col rounded-xl  drop-shadow-glow">
        <div className=" flex justify-between items-center  px-3 py-1 border-b border-slate-700 ">
          <h1>Biểu đồ kỹ thuật</h1>
          <button
            className=" flex hover:bg-blue-500"
            onClick={() => setIsChartModalOpen(false)}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
        <div className="m-3 h-full">
          <StockChart ticker={chosenTicker} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="  dark:text-white text-black flex flex-col h-full ">
      <div className=" flex sm:items-center flex-col sm:flex-row gap-y-2 gap-x-4 px-4 py-1">
        {manageVisible && (
          <button
            className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={() => setIsManageModalOpen(true)}
          >
            Thêm cột
          </button>
        )}
        {manageVisible && (
          <h1 className=" text-left">
            <span className=" font-bold">{currentRows.length}</span>
            <span> CP Thoã điều kiện</span>
          </h1>
        )}
      </div>
      <div className=" overflow-scroll">
        <table className="  w-full  border-collapse  ">
          {renderTableHeader()}
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  rowIndex % 2 === 1 && "dark:bg-slate-900 bg-neutral-200"
                }`}
              >
                {checkboxesVisible && (
                  <td
                    className="border border-slate-700 px-4 py-2 whitespace-nowrap cursor-pointer"
                    onClick={() => handleCheckboxChange(rowIndex)}
                  >
                    <input
                      type="checkbox"
                      checked={checkboxes[rowIndex] || false}
                      onChange={() => handleCheckboxChange(rowIndex)}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </td>
                )}
                {visibleColumns.map(
                  (column, colIndex) =>
                    column.visible && (
                      <td
                        key={colIndex}
                        className={`border border-slate-700 px-4 py-2 whitespace-nowrap ${
                          column.type === "right"
                            ? "text-right"
                            : column.type === "center"
                            ? "text-center"
                            : "text-left"
                        }
                        ${column.headerClassName}
                        ${
                          (column.headerName === "%" ||
                            column.headerName === "+/-") &&
                          (row[column.field] < 0
                            ? "text-red-500"
                            : row[column.field] > 0
                            ? "text-green-500"
                            : "text-yellow-500")
                        }
                        ${column.onClick && "hover:underline cursor-pointer"}
                        `}
                        onClick={() => {
                          if (column.onClick) {
                            setChosenTicker(row[column.field]);
                            setIsChartModalOpen(true);
                          }
                        }}
                      >
                        {column.type === "right"
                          ? formatNumberWithCommas(row[column.field])
                          : row[column.field]}
                        {/* {row[column.field]} */}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isChartModalOpen && renderChartModal()}
      {isManageModalOpen && renderManageModal()}
    </div>
  );
};

export default CustomTable;
