import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CustomTable = ({
  columns,
  rows,
  itemsPerPage = 20,
  maxVisiblePages = 7,
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

  return (
    <div className="  dark:text-white text-black flex flex-col h-full gap-y-2">
      <div className=" flex sm:items-center flex-col sm:flex-row gap-y-2 gap-x-4 px-4 py-1">
        <button
          className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
          onClick={() => setIsManageModalOpen(true)}
        >
          Thêm cột
        </button>
        <h1 className=" text-left">
          <span className=" font-bold">{currentRows.length}</span>
          <span> CP Thoã điều kiện</span>
        </h1>
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
                        }`}
                      >
                        {row[column.field]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isManageModalOpen && renderManageModal()}
    </div>
  );
};

export default CustomTable;
