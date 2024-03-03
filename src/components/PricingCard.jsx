import React from "react";

function PricingCard({ name, price, services, color }) {
  return (
    <div className=" flex flex-col gap-y-2 py-12  relative h-fit items-center">
      <div
        style={{ backgroundColor: color }}
        className=" h-5/6 rounded-lg w-80 bottom-0 absolute z-0"
      ></div>
      <div
        style={{ border: "2px solid " + color }}
        className="  bg-white border rounded-lg w-56 h-32 flex flex-col items-center justify-evenly z-10"
      >
        <h1 style={{ color }} className=" text-4xl font-extralight">
          {name}
        </h1>
        <h1 style={{ color }} className=" text-5xl font-bold">
          {price}
        </h1>
      </div>
      <div className=" flex flex-col py-5 gap-y-5 z-10">
        {services.map((service, index) => (
          <h1 key={index}>{service}</h1>
        ))}
      </div>
      <a
        href="#contact"
        style={{ color }}
        className={` font-extralight bg-white w-56 rounded-lg p-5 z-10 hover:bg-${color}`}
      >
        BUY NOW
      </a>
    </div>
  );
}

export default PricingCard;
