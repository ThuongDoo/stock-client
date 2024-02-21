import React from "react";
import PricingCard from "../components/PricingCard";

function Pricing() {
  const data = [
    {
      name: "Basic",
      price: "20$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#E83F47",
    },
    {
      name: "Standard",
      price: "30$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#00556B",
    },
    {
      name: "Advanced",
      price: "40$",
      services: ["Dashboard", "Market Watch", "Loc co phieu", "So Sanh"],
      color: "#004A86",
    },
  ];
  return (
    <div className=" h-screen text-white flex flex-col justify-around items-center">
      <h1 className=" text-5xl">Pricing</h1>
      {/* mien phi 15 ngay,  */}
      <div className=" flex justify-around  w-full">
        {data?.map((item, index) => (
          <PricingCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Pricing;
