import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../../utils/api";
import CustomModal from "../../../../components/CustomModal";
import { STRINGS } from "../../../../constants/strings";
import CloseIcon from "@mui/icons-material/Close";

function ArticleCategory() {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [chosenCategory, setChosenCategory] = useState(null);

  const handleChange = (event) => {
    setNewCategory(event.target.value);
  };
  const handleAddCategory = async () => {
    await api
      .post(endpoints.ARTICLE_CATEGORY, { name: newCategory })
      .then((res) => {
        console.log(res.data);
        setIsReload(!isReload);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setNewCategory("");
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.ARTICLE_CATEGORY)
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, [isReload]);
  return (
    <div className=" flex flex-col m-4">
      <div className=" flex items-center gap-x-3 justify-end">
        <input
          type="text"
          value={newCategory}
          onChange={handleChange}
          placeholder="Thêm danh mục"
          className=" block py-0.5 rounded px-4 border dark:text-white dark:bg-slate-900 dark:border-slate-700 border-black"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
        >
          Thêm
        </button>
      </div>
      <div className=" space-y-2 mt-5">
        {categories?.map((item, index) => (
          <div
            key={index}
            className={` flex w-full justify-between items-center border-b`}
          >
            <h1 className=" py-0.5 px-4">{item.name}</h1>
            <div className=" flex gap-x-2">
              <button
                onClick={() => {
                  setChosenCategory(item);
                  setIsEditModalVisible(true);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
              >
                Sửa
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded">
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditModalVisible && (
        <EditModal
          onClose={() => {
            setIsEditModalVisible(false);
          }}
          label="Edit Category"
          className=" h-20"
          category={chosenCategory}
          onReload={() => setIsReload(!isReload)}
        />
      )}
    </div>
  );
}

export default ArticleCategory;

const EditModal = ({ onClose, label = "label", category, onReload }) => {
  const [name, setName] = useState(category.name);
  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  const handleUpdate = async () => {
    await api
      .post(endpoints.ARTICLE_CATEGORY + `/${category.id}`, { name: name })
      .then((res) => {
        onReload(true);
        onClose(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50">
      <div
        className=" w-full h-full"
        onClick={() => {
          onClose(true);
        }}
      ></div>
      <div className=" dark:bg-slate-900 bg-neutral-200 text-black dark:text-white  absolute w-fit  flex flex-col rounded-xl  drop-shadow-glow">
        <div className=" flex justify-between items-center  px-3 py-1 border-b border-slate-700 ">
          <h1>{label}</h1>
          <button
            className=" flex hover:bg-blue-500"
            onClick={() => {
              onClose(true);
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
        <div className=" h-full flex justify-center items-center m-10 gap-x-5">
          <input
            type="text"
            value={name}
            onChange={handleOnChange}
            className=" rounded text-black px-4 py-0.5"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0.5 px-4 rounded"
            onClick={handleUpdate}
          >
            {STRINGS.UPDATE}
          </button>
        </div>
      </div>
    </div>
  );
};
