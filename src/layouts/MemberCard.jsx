import React from "react";

function MemberCard({ name, image, position, facebook }) {
  return (
    <div className=" text-white">
      <img src={image} alt="" className=" w-60 h-60" />
      <h1>{name}</h1>
      <h1>{position}</h1>
    </div>
  );
}

export default MemberCard;
