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
    <div className=" relative max-w-xs">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Tìm kiếm CK"
        className=" block rounded-lg px-4 py-2 border dark:text-white dark:bg-slate-900 dark:border-slate-700 border-black w-48"
      />
      <ul
        ref={dropdownRef}
        className={`absolute w-full z-50 ${
          suggestions.length > 0 && searchTerm !== "" ? "block" : "hidden"
        } bg-gray-500 border rounded-md`}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              handleSelectSuggestion(suggestion);
            }}
            className=" text-white cursor-pointer hover:bg-red-500"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
