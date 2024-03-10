import React, { useState } from "react";
import Papa from "papaparse";
import api from "../utils/api";
import { addHours, formatISO, parse } from "date-fns";
import { deletedBuysell } from "../constants/deletedBuysell";
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

const filterBuysellSignal = async (data) => {
  const tempData = data;

  //Định dạng lại ngày
  tempData.forEach((row) => {
    row["Date/Time"] = parse(row["Date/Time"], "M/d/yyyy HH:mm:ss", new Date());
  });

  tempData.sort((a, b) => a["Date/Time"] - b["Date/Time"]);
  const lastRow = tempData[tempData.length - 1];

  //lọc tín hiệu có buy sell
  const filterSignal = tempData.filter((row) => row["Mua-Ban"] !== "");

  //xoá phần tử đầu nếu nó là sell
  if (filterSignal[0]?.["Mua-Ban"] === "0") {
    filterSignal.shift();
  }
  if (filterSignal.length === 0) {
    return null;
  }

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

const ImportFile = () => {
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
    // buysellArray.push(filterBuysellSignal(removedArray[40]));

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
        .post("/stock/buysell/importFile", sendData)
        .then((res) => {
          console.log(res.data);
        })
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
      console.log(newData);
    };
    reader.readAsText(file);
  };
  return (
    <div className="">
      <h1 className="">IMPORT CSV</h1>
      <div className="">
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
        </label>
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <button onClick={handleParse}>UPDATE</button>
        </div>
        <div style={{ marginTop: "3rem" }}>{error && error}</div>
      </div>
    </div>
  );
};

export default ImportFile;
