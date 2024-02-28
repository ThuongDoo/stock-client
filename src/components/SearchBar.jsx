import React, { useEffect, useRef, useState } from "react";

function SearchBar({ suggestionData, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSelect(value);
    // Tính toán các gợi ý dựa trên giá trị tìm kiếm
    // Ở đây, bạn có thể lấy dữ liệu từ API hoặc từ một danh sách dữ liệu cố định
    const suggestions = suggestionData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className=" relative ">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Tìm kiếm CK"
        className=" rounded-lg px-2 border dark:text-white dark:bg-slate-900 dark:border-slate-700"
      />
      <ul
        ref={dropdownRef}
        className={`absolute w-full ${
          suggestions.length > 0 && searchTerm !== "" ? "block" : "hidden"
        } bg-blue-500`}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              handleSelectSuggestion(suggestion);
            }}
            className=" dark:text-white cursor-pointer hover:bg-red-500"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
