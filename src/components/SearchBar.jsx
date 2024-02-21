import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Tính toán các gợi ý dựa trên giá trị tìm kiếm
    // Ở đây, bạn có thể lấy dữ liệu từ API hoặc từ một danh sách dữ liệu cố định
    const suggestions = [
      "apple",
      "banana",
      "orange",
      "pineapple",
      "strawberry",
      "watermelon",
    ].filter((item) => item.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(suggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className=" relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Tìm kiếm CK"
        className=" rounded-lg px-2 border dark:text-white dark:bg-slate-900 dark:border-slate-700"
      />
      {/* <ul className=" absolute">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelectSuggestion(suggestion)}
            className=" dark:text-white"
          >
            {suggestion}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default SearchBar;
