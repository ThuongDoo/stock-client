import React from "react";
import PricingCard from "../components/PricingCard";
import SimpleCarousel from "../components/SimpleCarousel";

function Pricing() {
  const data = [
    {
      name: "Trải nghiệm",
      price: "20$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#CA8A04",
    },
    {
      name: "Standard",
      price: "30$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#15803D",
    },
    {
      name: "Advanced",
      price: "40$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#B91C1C",
    },
    {
      name: "Advanced",
      price: "40$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#3B0764",
    },
  ];
  return (
    <div className=" min-h-screen text-white flex flex-col justify-around items-center bg-white">
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
