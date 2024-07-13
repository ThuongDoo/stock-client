import React, { useState } from "react";
import { STRINGS } from "../constants/strings";

const JsonReader = ({ onRead }) => {
  const [data, setData] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const tempData = JSON.parse(e.target.result);
          setData(tempData);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className=" p-6 w-full ">
      <h1 className="text-xl font-bold mb-4 text-left">
        {STRINGS.IMPORT_CATEGORY}
      </h1>
      <div className="mb-4 flex gap-3 w-full">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          onClick={() => {
            onRead(data);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
        >
          {STRINGS.UPLOAD}
        </button>
      </div>
      {/* {error && <div className="text-red-500 text-sm">{error}</div>} */}
    </div>
  );
};

export default JsonReader;
