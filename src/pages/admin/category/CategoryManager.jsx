import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import JsonReader from "../../../components/JsonReader";
import TabBar from "../../../components/TabBar";

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
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.CATEGORY)
        .then((res) => {
          const tempData = res.data.map((item) => {
            return {
              name: item.id,
              displayName: item.name,
              child: item.Securities,
            };
          });
          setCategories(tempData);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);

  const handleReadFile = (value) => {
    const data = formatData(value);
    const fetchData = async () => {
      await api
        .post(endpoints.CATEGORY_UPDATE, data)
        .then((res) => {})
        .catch((e) => console.log(e));
    };
    fetchData();
  };
  const handleSideBar = (tab) => {
    setChosenCategory(tab);
  };
  console.log(chosenCategory);
  return (
    <div className=" flex">
      <div className=" w-64 bg-black border-r border-slate-700">
        <TabBar
          tabs={categories}
          onTabClick={handleSideBar}
          hideDisplayName={false}
        />
      </div>
      {chosenCategory !== null && (
        <div className=" flex flex-col w-full h-full items-center text-left">
          <JsonReader onRead={handleReadFile} />
          <div className=" space-y-4">
            <div className="  flex flex-col items-start justify-between">
              <h1>ID</h1>
              <h1 className=" bg-white text-black px-4 py-1 rounded-xl w-64">
                {chosenCategory.name}
              </h1>
            </div>
            <div className="  flex flex-col items-start justify-between">
              <h1>Name</h1>
              <h1 className=" bg-white text-black px-4 py-1 rounded-xl w-64">
                {chosenCategory.displayName}
              </h1>
            </div>
            <div className=" flex flex-col items-start">
              <h1>Danh sách cổ phiếu</h1>
              <div className=" flex flex-col space-y-2">
                {chosenCategory.child.map((item, index) => (
                  <h1 className=" bg-white text-black px-4 py-1 rounded-xl w-64">
                    {item.Symbol}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryManager;
