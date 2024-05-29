import React from "react";

function BuySellSkeleton() {
  const skeletonElements = Array.from({ length: 15 }, (_, index) => (
    <div
      key={index}
      className=" animate-pulse rounded-lg bg-slate-700 w-full h-6"
    ></div>
  ));
  return (
    <div className=" max-h-[40rem]  overflow-y-auto block ">
      <table className=" dark:text-white table-auto overflow-scroll w-full ">
        <thead>
          <tr className="">
            <th className=" px-4 py-2">STT</th>
            <th className=" px-4 py-2">Mã</th>
            <th className=" px-4 py-2">Thời gian KN</th>
            <th className=" px-4 py-2">Giá mua</th>
            <th className=" px-4 py-2">Lãi/lỗ</th>
            <th className=" px-4 py-2">Thời gian nắm giữ</th>
            <th className=" px-4 py-2">Vị thế</th>
            <th className=" px-4 py-2" colSpan={3}>
              Ghi chú
            </th>
          </tr>
        </thead>
        {/* <tbody className=" ">{skeletonElements}</tbody> */}
      </table>
      <div className=" w-full h-full space-y-2">{skeletonElements}</div>
    </div>
  );
}

export default BuySellSkeleton;
