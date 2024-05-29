import React from "react";

function LocCoPhieuSkeleton() {
  const skeletonElements = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      className="animate-pulse flex flex-col bg-slate-700 rounded-lg m-2  h-12"
    ></div>
  ));
  return (
    <div className="container mx-auto h-full">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  max-h-[24rem] overflow-y-scroll">
        {skeletonElements}
      </div>
    </div>
  );
}

export default LocCoPhieuSkeleton;
