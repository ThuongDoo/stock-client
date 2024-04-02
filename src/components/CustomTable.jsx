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
  const [currentPage, setCurrentPage] = useState(1);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRows = sortedRows().slice(startIndex, endIndex);

  const pageCount = Math.ceil(sortedRows().length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(sortedRows().length / itemsPerPage);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 border border-gray-400 ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => changePage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 border border-gray-400 ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => changePage(i)}
          >
            {i}
          </button>
        );
      }

      if (startPage > 1) {
        pageNumbers.unshift(
          <button
            key={1}
            className={`px-3 py-1 mx-1 border border-gray-400 bg-gray-200`}
            onClick={() => changePage(1)}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pageNumbers.unshift(
            <button
              key={"prev-ellipsis"}
              className={`px-3 py-1 mx-1 border border-gray-400 bg-gray-200 cursor-default`}
            >
              ...
            </button>
          );
        }
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(
            <button
              key={"next-ellipsis"}
              className={`px-3 py-1 mx-1 border border-gray-400 bg-gray-200 cursor-default`}
            >
              ...
            </button>
          );
        }
        pageNumbers.push(
          <button
            key={totalPages}
            className={`px-3 py-1 mx-1 border border-gray-400 bg-gray-200`}
            onClick={() => changePage(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pageNumbers;
  };

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
                className="border border-gray-400 px-4 py-2 bg-gray-100 cursor-pointer"
                onClick={() => handleSort(column.field)}
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
      <div className=" flex items-center justify-between">
        <button
          className=" text-blue-500 px-4 py-1 "
          onClick={() => setIsManageModalOpen(true)}
        >
          Manage Columns
        </button>
        <div className="flex justify-center">{renderPagination()}</div>
      </div>
      <div className=" overflow-scroll">
        <table className=" w-full border-collapse border ">
          {renderTableHeader()}
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {visibleColumns.map(
                  (column, colIndex) =>
                    column.visible && (
                      <td
                        key={colIndex}
                        className="border border-gray-400 px-4 py-2 whitespace-nowrap"
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
