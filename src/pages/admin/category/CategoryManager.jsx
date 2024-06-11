import React, { useState } from "react";
import api, { endpoints } from "../../../utils/api";
import JsonReader from "../../../components/JsonReader";

const formatData = (categories) => {
  const securityArray = [];
  const categoryArray = categories.map((item) => {
    const securities = item.securities.map((securityItem) => {
      return {
        categoryId: item.id,
        symbol: securityItem,
      };
    });
    securityArray.push(...securities);
    return {
      id: item.id,
      name: item.name,
    };
  });

  return { categories: categoryArray, securities: securityArray };
};

function CategoryManager() {
  const handleReadFile = (value) => {
    const data = formatData(value);
    const fetchData = async () => {
      await api
        .post(endpoints.CATEGORY_UPDATE, data)
        .then((res) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  };
  return (
    <div>
      <JsonReader onRead={handleReadFile} />
    </div>
  );
}

export default CategoryManager;
