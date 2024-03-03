import React from "react";

function ReviewCard({ name, position, content, image }) {
  return (
    <div className="p-4  flex flex-col items-center">
      <img src={image} alt="" className=" w-72 h-96 rounded-md" />
      <h2 className="text-xl font-semibold text-gray-500 uppercase">{name}</h2>
      <p className="text-gray-500">{position}</p>
      {/* <p className="mt-2 text-3xl font-extralight text-slate-400">{content}</p> */}
    </div>
  );
}

export default ReviewCard;
