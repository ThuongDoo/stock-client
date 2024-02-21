import React from "react";
import ReviewCard from "../components/ReviewCard";
import Slider from "../components/Slider";

function Review() {
  const data = [
    {
      name: "Do Manh Thuong",
      position: "Senior Manager",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
    {
      name: "Do Manh Thuong",
      position: "Senior Manager",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
    {
      name: "Do Manh Thuong",
      position: "Senior Manager",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
    {
      name: "Do Manh Thuong",
      position: "Senior Manager",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
    {
      name: "Do Manh Thuong",
      position: "Senior Manager",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/640px-Donald_Trump_official_portrait.jpg",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis itaque excepturi modi, illum id numquam aspernatur vero, natus libero, voluptatibus minus. Nisi explicabo libero sequi ab distinctio. Reprehenderit, pariatur hic?",
    },
  ];
  return (
    <div className=" h-screen  bg-white flex flex-col justify-around">
      <h1 className=" text-5xl">Recent reviews</h1>
      <div className=" ">
        <Slider
          components={data.map((item, index) => (
            <ReviewCard key={index} {...item} />
          ))}
        />
      </div>
    </div>
  );
}

export default Review;
