import React, { useState } from "react";
import Papa from "papaparse";
import api, { endpoints } from "../../../utils/api";
import { addHours, formatISO, parse } from "date-fns";
import { deletedBuysell } from "../../../constants/deletedBuysell";
import { STRINGS } from "../../../constants/strings";
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const createBuySellObject = (buySignal, sellSignal) => {
  const buysell = {};
  buysell.ticker = buySignal.Ticker;
  buysell.knTime = buySignal["Date/Time"];
  buysell.buyPrice = Number(buySignal["Giamua/ban"]);

  if (sellSignal?.["Mua-Ban"] === "0") {
    buysell.status = Number(sellSignal["Mua-Ban"]);
    buysell.profit = Number(sellSignal["Lai/lo%"]);
    buysell.holdingDuration = Number(sellSignal["T+"]);
    buysell.sellTime = sellSignal["Date/Time"];
    buysell.sortTime = sellSignal["Date/Time"];
    buysell.sellPrice = Number(sellSignal["Giamua/ban"]);
  } else {
    buysell.status = 2;
    buysell.profit = 0;
    buysell.holdingDuration = 0;
    buysell.sortTime = buySignal["Date/Time"];
  }

  buysell.risk = sellSignal?.risk;
  return buysell;
};

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

const filterArrayByRule = async (arr) => {
  let filteredArray = [];
  let prevValue = "0"; // Giá trị ban đầu để có thể so sánh với 0

  for (let i = 0; i < arr.length; i++) {
    // Nếu thuộc tính "Mua-Ban" của object là 1 hoặc 0
    if (arr[i]["Mua-Ban"] !== prevValue) {
      // Kiểm tra nếu giá trị "Mua-Ban" khác với giá trị của object trước đó
      filteredArray.push(arr[i]); // Thêm object vào mảng lọc
    }
    filteredArray.pop();
    filteredArray.push(arr[i]);
    prevValue = arr[i]["Mua-Ban"]; // Cập nhật giá trị trước đó
  }

  return filteredArray;
};

const filterBuysellSignal = async (data) => {
  const tempData = data;

  //Định dạng lại ngày
  tempData.forEach((row) => {
    const parsedDate = parse(row["Date/Time"], "M/d/yyyy HH:mm:ss", new Date());
    const modifiedDate = addHours(parsedDate, 7);
    row["Date/Time"] = modifiedDate;
  });

  tempData.sort((a, b) => a["Date/Time"] - b["Date/Time"]);
  const lastRow = tempData[tempData.length - 1];

  //lọc tín hiệu có buy sell
  let filterSignal = tempData.filter((row) => row["Mua-Ban"] !== "");

  //xoá phần tử đầu nếu nó là sell
  if (filterSignal[0]?.["Mua-Ban"] === "0") {
    filterSignal.shift();
  }
  if (filterSignal.length === 0) {
    return null;
  }

  const tempSignal = await filterArrayByRule(filterSignal);
  filterSignal = tempSignal;

  if (
    lastRow["Mua-Ban"] === "" &&
    filterSignal[filterSignal.length - 1]["Mua-Ban"] === "1"
  ) {
    filterSignal.push(lastRow);
  }

  const filterArray = [];
  for (let i = 0; i < filterSignal.length; i += 2) {
    let buysell = createBuySellObject(filterSignal[i], filterSignal[i + 1]);
    filterArray.push(buysell);
  }
  return filterArray;
};

const ImportBuysell = () => {
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

  const formatData = async (csvData) => {
    let filteredTickers = groupByProperty(csvData, "Ticker");
    let removedTickers = filterObjectByKeys(filteredTickers, deletedBuysell);
    let removedArray = Object.values(removedTickers);

    const buysellArray = [];
    // buysellArray.push(await filterBuysellSignal(removedArray[61]));

    for (const item of removedArray) {
      const result = await filterBuysellSignal(item);
      buysellArray.push(result);
    }

    const resultArray = buysellArray.flat();
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
        .post(endpoints.BUYSELL_IMPORT, sendData)
        .then((res) => {})
        .catch((err) => console.log(err));
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
  return (
    <div className=" p-6 w-full ">
      <h1 className="text-xl font-bold mb-4 text-left">
        {STRINGS.IMPORT_BUYSELL}
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
};

export default ImportBuysell;
