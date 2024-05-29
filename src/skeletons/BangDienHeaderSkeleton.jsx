import React from "react";

function BangDienHeaderSkeleton() {
  const skeletonElements = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className=" animate-pulse flex flex-col justify-around px-3 mb-2 w-full h-12 items-center"
    >
      <div className=" h-2 w-1/2 bg-slate-700 "></div>
      <div className=" flex justify-between w-full">
        <div className=" h-2 w-1/2 bg-slate-700"></div>
        <div className=" h-2 w-1/2 bg-slate-700"></div>
      </div>
    </div>
  ));
  return (
    <div className="  w-full items-center grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 ">
      {skeletonElements}
    </div>
  );
}

export default BangDienHeaderSkeleton;
