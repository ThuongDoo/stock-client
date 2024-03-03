import React from "react";
import PricingCard from "../components/PricingCard";
import SimpleCarousel from "../components/SimpleCarousel";

function Pricing() {
  const data = [
    {
      name: "X - 15 ngày",
      price: "Free",
      services: ["Bảng điện AI", "Tín hiệu Mua - Bán"],
      discount: "600k",
      color: "#CA8A04",
    },
    {
      name: "X - 3 tháng",
      price: "2999k",
      services: [
        "Bảng điện AI",
        "Tín hiệu Mua - Bán",
        "Hỗ trợ kiến thức nền",
        "Lọc Cổ Phiếu nâng cao (comming soon)",
      ],
      discount: "3600k",
      color: "#15803D",
    },
    {
      name: "X - 6 tháng",
      price: "5999k",
      services: [
        "Bảng điện AI",
        "Tín hiệu Mua - Bán",
        "Hỗ trợ kiến thức nền",
        "Hỗ trợ tư vấn 1:1",
        "Phân tích cổ phiêu riêng lẻ",
        "Cơ cấu danh mục",
        "Lọc Cổ Phiếu nâng cao (comming soon)",
      ],
      discount: "7200k",
      color: "#B91C1C",
    },
    {
      name: "X - 12 tháng",
      price: "10999k",
      services: [
        "Bảng điện AI",
        "Tín hiệu Mua - Bán",
        "Hỗ trợ kiến thức nền",
        "Hỗ trợ tư vấn 1:1",
        "Phân tích cổ phiêu riêng lẻ",
        "Cơ cấu danh mục",
        "Lọc Cổ Phiếu nâng cao (comming soon)",
        "Thiết lập và cài đặt Amibroker 1 số code cơ bản trị giá 3tr",
      ],
      discount: "14400k",
      color: "#3B0764",
    },
  ];
  return (
    <div className=" min-h-screen text-white flex flex-col justify-around items-center bg-white py-10">
      <h1 className=" text-5xl text-black">Bảng giá</h1>
      {/* mien phi 15 ngay,  */}
      <div className="   w-full  ">
        <SimpleCarousel slides={3}>
          {data?.map((item, index) => (
            <PricingCard key={index} {...item} />
          ))}
        </SimpleCarousel>
      </div>
    </div>
  );
}

export default Pricing;
