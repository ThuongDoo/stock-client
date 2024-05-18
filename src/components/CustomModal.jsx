import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function CustomModal({ onClose, children, label = "label" }) {
  return (
    <div className=" bg-gray-800 bg-opacity-30 flex justify-center top-0 left-0 items-center fixed h-full w-full z-50">
      <div
        className=" w-full h-full"
        onClick={() => {
          onClose(true);
        }}
      ></div>
      <div className=" dark:bg-slate-900 bg-neutral-200 text-black dark:text-white  absolute w-3/4 h-3/4 flex flex-col rounded-xl  drop-shadow-glow">
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
        <div className=" overflow-y-scroll m-3">{children}</div>
      </div>
    </div>
  );
}

export default CustomModal;
