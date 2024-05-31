import React, { useState } from "react";

const JsonReader = ({ onRead }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          onRead(data);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={handleFileChange} />
    </div>
  );
};

export default JsonReader;
