import React, { useState } from "react";
import { STRINGS } from "../../../constants/strings";
import Papa from "papaparse";
import { deletedBuysell } from "../../../constants/deletedBuysell";
import { addHours, parse } from "date-fns";
import api, { endpoints } from "../../../utils/api";
import { Bounce, ToastContainer, toast } from "react-toastify";

const allowedExtensions = ["csv"];

const groupByProperty = (array, property) => {
  // Tạo một đối tượng để lưu trữ các nhóm
  let groups = {};

  // Lặp qua mảng và nhóm các phần tử dựa trên thuộc tính
  array.forEach((item) => {
    const value = item[property];
    if (!groups[value]) {
      // Nếu nhóm chưa tồn tại, tạo mới
      groups[value] = [item];
    } else {
      // Nếu nhóm đã tồn tại, thêm vào nhóm đó
      groups[value].push(item);
    }
  });

  // Chuyển đổi đối tượng nhóm thành mảng và trả về
  return groups;
};

const filterObjectByKeys = (objectToFilter, keysToRemove) => {
  for (let key in objectToFilter) {
    if (keysToRemove.includes(key) || key === "") {
      delete objectToFilter[key];
    }
  }
  return objectToFilter;
};

const formatDailyOhlc = async (data) => {
  const tempData = data.map((row) => {
    const parsedDate = parse(row["Date/Time"], "M/d/yyyy HH:mm:ss", new Date());
    const modifiedDate = addHours(parsedDate, 7);
    return {
      ticker: row.Ticker,
      time: modifiedDate,
      market: row.San,
      open: Number(row.GiaMoCua),
      high: Number(row.GiaCaoNhat),
      low: Number(row.GiaThapNhat),
      close: Number(row.GiaDongCua),
      volume: Number(row.KhoiLuong),
    };
  });

  tempData.sort((a, b) => a["Date/Time"] - b["Date/Time"]);

  return tempData;
};

const formatData = async (csvData) => {
  let filteredTickers = groupByProperty(csvData, "Ticker");
  let removedTickers = filterObjectByKeys(filteredTickers, deletedBuysell);
  let removedArray = Object.values(removedTickers);

  const ohlcArray = [];

  for (const item of removedArray) {
    const result = await formatDailyOhlc(item);
    ohlcArray.push(result);
  }

  const resultArray = ohlcArray.flat();
  return resultArray;
};

const updateData = async (data) => {
  // Lọc ra những phần tử khác null

  // Thêm phần tử header: "done" vào cuối mảng
  data.push({ header: "done" });

  const chunkSize = 300;
  const totalChunks = Math.ceil(data.length / chunkSize); // Tính tổng số chunks

  for (let i = 0; i < totalChunks; i++) {
    const startIdx = i * chunkSize;
    const endIdx = Math.min((i + 1) * chunkSize, data.length); // Đảm bảo không vượt quá chiều dài của mảng
    const sendData = data.slice(startIdx, endIdx); // Slice the data array to get the current chunk

    await api
      .post(endpoints.OHLC_DAILY_IMPORT, sendData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
};

function ImportDailyOhlc() {
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const handleFileChange = (e) => {
    setError("");

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not
      // included in the allowed extensions
      // we show the error
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file");
        return;
      }

      // If input type is correct set the state
      setFile(inputFile);
    }
  };

  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return alert("Enter a valid file");

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const newData = await formatData(csv?.data);
      updateData(newData);
    };
    reader.readAsText(file);
  };

  const notify = ({ text, onYes }) => {
    toast.warning(
      <div className=" flex flex-col gap-y-2">
        <span>{text}</span>
        <div className=" space-x-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={onYes}
          >
            {STRINGS.YES}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={toast.dismiss}
          >
            {STRINGS.NO}
          </button>
        </div>
      </div>,
      {
        closeButton: false,
        autoClose: 5000,
        onClose: () => {}, // Nếu bạn muốn thực hiện một hành động nào đó khi toast được đóng
      }
    );
  };
  return (
    <div className=" p-6 w-full ">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <h1 className="text-xl font-bold mb-4 text-left">
        {STRINGS.IMPORT_DAILY_OHLC}
      </h1>
      <div className="mb-4 flex gap-3 w-full">
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="file"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          onClick={handleParse}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
        >
          {STRINGS.UPLOAD}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default ImportDailyOhlc;
