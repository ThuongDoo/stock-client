import React from "react";
import bangDienThongMinh from "../../../images/bangDienThongMinh.png";
import daDangThiTruong from "../../../images/daDangThiTruong.png";
import duLieuRealtime from "../../../images/duLieuRealtime.png";
import hoTroPhanTich from "../../../images/hoTroPhanTich.png";
import locCoPhieuChuyenSau from "../../../images/locCoPhieuChuyenSau.png";
import tinHieuMuaBan from "../../../images/tinHieuMuaBan.png";

const featureCards = [
  {
    image: daDangThiTruong,
    content: "Đa dạng thị trường",
  },
  {
    image: hoTroPhanTich,
    content: "Hỗ trợ phân tích 1:1",
  },
  {
    image: bangDienThongMinh,
    content: "Bảng điện thông minh",
  },
  {
    image: locCoPhieuChuyenSau,
    content: "Lọc cổ phiếu chuyên sâu",
  },
  {
    image: tinHieuMuaBan,
    content: "Tín hiệu mua bán",
  },
  {
    image: duLieuRealtime,
    content: "Dữ liệu Realtime",
  },
];

function Feature() {
  return (
    <div className="">
      {/* <h1 className=" text-black bg-white text-3xl">Tính năng</h1> */}
      <div className="  min-h-screen  text-black bg-white p-8 grid grid-cols-1 gap-y-32 md:gap-y-0 md:grid-cols-3">
        {featureCards.map((card, index) => (
          <div
            key={index}
            className=" flex flex-col justify-center items-center gap-y-2 "
          >
            <img src={card.image} alt="" className=" size-32" />
            <h1 className=" text-2xl font-bold text-[#586b80]">
              {card.content}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feature;
