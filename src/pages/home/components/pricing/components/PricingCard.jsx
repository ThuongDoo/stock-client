import React from "react";

function PricingCard({ name, price, services, color, discount }) {
  return (
    <div className=" flex flex-col gap-y-2 py-12  relative h-fit items-center">
      <div className=" h-full rounded-lg w-80 bottom-0 absolute z-0 flex flex-col">
        <div className=" h-28 w-full"></div>
        <div
          className="  top-14 flex-1  w-full rounded-lg"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div
        style={{ border: "2px solid " + color }}
        className="  bg-white border rounded-lg w-56 h-32 flex flex-col items-center justify-evenly z-10"
      >
        <h1 style={{ color }} className=" text-4xl font-bold ">
          {name}
        </h1>
        <h1 style={{ color }} className=" line-through text-2xl">
          {discount}
        </h1>
        <h1 style={{ color }} className=" text-3xl ">
          {price}
        </h1>
      </div>
      <div className=" flex flex-col py-5 gap-y-5 z-10 max-w-56">
        {services.map((service, index) => (
          <h1 key={index} className=" break-words ">
            {service}
          </h1>
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
