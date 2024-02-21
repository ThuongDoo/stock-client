import React from "react";
import MemberCard from "./MemberCard";

function AboutUs() {
  const members = [
    {
      name: "Do Manh Thuong",
      position: "Co Founder",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      facebook: "https://www.facebook.com/domanhthuong20122002/",
    },
    {
      name: "Do Manh Thuong",
      position: "Co Founder",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      facebook: "https://www.facebook.com/domanhthuong20122002/",
    },
    {
      name: "Do Manh Thuong",
      position: "Co Founder",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      facebook: "https://www.facebook.com/domanhthuong20122002/",
    },
    {
      name: "Do Manh Thuong",
      position: "Co Founder",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      facebook: "https://www.facebook.com/domanhthuong20122002/",
    },
  ];
  return (
    <div className=" h-screen text-white flex flex-col justify-between">
      <h1 className=" text-5xl">Our Team</h1>
      <div className=" flex justify-center gap-x-20">
        {members.map((member, index) => (
          <MemberCard key={index} {...member} />
        ))}
      </div>
      <h1 className=" text-5xl">Advisors</h1>
      <div className=" flex justify-center gap-x-20">
        {members.map((member, index) => (
          <MemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
