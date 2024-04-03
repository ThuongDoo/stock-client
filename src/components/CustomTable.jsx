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
                className={`border border-gray-400 px-4 py-2 bg-gray-100 cursor-pointer`}
                onClick={() => handleSort(column.field)}
                style={{ minWidth: column.minWidth + "px" }}
              >
                {column.headerName}
                {sortConfig.field === column.field && sortConfig.direction && (
                  <span className="ml-2">
                    {sortConfig.direction === "ascending" ? (
                      <ExpandLessIcon sx={{ color: "blue", fontSize: 20 }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: "blue", fontSize: 20 }} />
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
      <div className="bg-white p-4 rounded-md w-64">
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
    <div className=" text-blue-500 flex flex-col h-full gap-y-2">
      <div className=" flex items-center">
        <button
          className=" text-blue-500 px-4 py-1 hover:text-white"
          onClick={() => setIsManageModalOpen(true)}
        >
          Manage Columns
        </button>
        <h1 className="">
          <span>{currentRows.length}</span>
          <span> CP Thoã điều kiện</span>
        </h1>
      </div>
      <div className=" overflow-scroll">
        <table className="  w-full  border-collapse border ">
          {renderTableHeader()}
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {visibleColumns.map(
                  (column, colIndex) =>
                    column.visible && (
                      <td
                        key={colIndex}
                        className={`border border-gray-400 px-4 py-2 whitespace-nowrap ${
                          column.type === "number" ? "text-right" : "text-left"
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
