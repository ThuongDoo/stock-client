import React from "react";
import ReviewCard from "../components/ReviewCard";
import Slider from "../components/Slider";
import SimpleCarousel from "../components/SimpleCarousel";
import phuImg from "../images/phu.jpeg";
import luanImg from "../images/luan.jpeg";
import thuongImg from "../images/thuong.jpeg";

function Review() {
  const data = [
    {
      name: "Lê Luân",
      position: "Founder",
      image: luanImg,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
    {
      name: "Nguyễn Hà Huy Phú",
      position: "Co - Founder",
      image: phuImg,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
    {
      name: "Đỗ Mạnh Thường",
      position: "Co - Founder",
      image: thuongImg,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
  ];
  return (
    <div className=" min-h-screen  bg-white flex flex-col justify-around">
      <h1 className=" text-4xl text-black font-semibold font-sans ">
        XYZ Team
      </h1>
      <div className=" ">
        <SimpleCarousel>
          {data.map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        </SimpleCarousel>
        {/* <Slider
          components={data.map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        /> */}
      </div>
    </div>
  );
}

export default Review;
