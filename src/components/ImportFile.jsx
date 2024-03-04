import React, { useState } from "react";
import Papa from "papaparse";
import api from "../utils/api";
import { formatISO, parse } from "date-fns";
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const ImportFile = () => {
  // This state will store the parsed data

  // It state will contain the error when
  // correct file extension is not used
  const [error, setError] = useState("");

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // This function will be called when
  // the file input changes
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
  const formatData = (csvData) => {
    const convertToISO = (dateString) => {
      // console.log(dateString);

      // Tạo một đối tượng Date từ chuỗi ngày tháng đầu vào
      try {
        const parsedDate = parse(dateString, "M/d/yyyy HH:mm:ss", new Date());
        const isoString = formatISO(parsedDate);
        return isoString;
      } catch (error) {
        return dateString;
      }
    };
    return csvData
      .filter((item) => item.Ticker !== "")
      .map((item) => {
        return {
          ticker: item.Ticker,
          price: Number(item.Giamua),
          date: convertToISO(item["Date/Time"]),
          profit: Number(item["Lai/lo%"]),
          status: Number(item["Mua-Ban"]),
        };
      });
  };

  const updateData = async (data) => {
    // Lọc ra những phần tử khác null

    // Thêm phần tử header: "done" vào cuối mảng
    data.push({ header: "done" });

    const chunkSize = 1000;
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
      const newData = formatData(csv?.data);
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
