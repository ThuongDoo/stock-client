import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleCarousel = ({ children, slides = 3 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 1,
    autoplay: true, // Cho phép autoplay
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 640, // Thiết lập breakpoint dành cho kích thước sm (tùy chỉnh theo nhu cầu)
        settings: {
          slidesToShow: 1, // Đặt slidesToShow = 1 khi kích thước màn hình nhỏ hơn hoặc bằng breakpoint
        },
      },
      {
        breakpoint: 990, // Thiết lập breakpoint khác nếu cần
        settings: {
          slidesToShow: 2, // Ví dụ: Hiển thị 3 slide trên màn hình lớn hơn hoặc bằng 1024px
        },
      },
      {
        breakpoint: 1323, // Thiết lập breakpoint khác nếu cần
        settings: {
          slidesToShow: 3, // Ví dụ: Hiển thị 3 slide trên màn hình lớn hơn hoặc bằng 1024px
        },
      },
      // Thêm các breakpoint khác nếu cần
    ],
  };

  return (
    <Slider {...settings} className=" ">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="">
          {child}
        </div>
      ))}
    </Slider>
  );
};

export default SimpleCarousel;
