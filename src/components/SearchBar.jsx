import React, { useEffect, useRef, useState } from "react";
import api, { endpoints } from "../utils/api";

function SearchBar({ onSelect, placeholder = "Tìm kiểm" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [securities, setSecurities] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSecurities = async () => {
      await api
        .get(endpoints.SSI_SECURITY)
        .then((res) => {
          const tempData = res.data.data.map((item) => {
            return item.Symbol;
          });
          setSecurities(tempData);
        })
        .catch((e) => console.log(e));
    };
    fetchSecurities();
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter and sort suggestions
    const suggestions = securities
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => {
        const lowerCaseValue = value.toLowerCase();
        const indexA = a.toLowerCase().indexOf(lowerCaseValue);
        const indexB = b.toLowerCase().indexOf(lowerCaseValue);

        if (indexA === 0 && indexB !== 0) {
          return -1;
        } else if (indexA !== 0 && indexB === 0) {
          return 1;
        } else {
          return indexA - indexB;
        }
      });

    setSuggestions(suggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm("");
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className=" relative h-full w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className=" block rounded-lg px-4 h-full w-full border dark:text-white dark:bg-slate-900 dark:border-slate-700 border-black"
      />
      <ul
        ref={dropdownRef}
        className={`absolute w-full z-50 ${
          suggestions.length > 0 && searchTerm !== "" ? "block" : "hidden"
        } bg-gray-500 border rounded-md overflow-y-scroll max-h-96`}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => {
              handleSelectSuggestion(suggestion);
            }}
            className=" text-white cursor-pointer hover:bg-blue-500 bg-slate-800"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
