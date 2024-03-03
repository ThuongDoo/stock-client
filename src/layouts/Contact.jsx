import React from "react";
import ContactForm from "../components/forms/ContactForm";
import zaloIcon from "../images/icons8-zalo-48.png";
import api from "../utils/api";
import contactBackground from "../images/contactBackground.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "../images/logo.png";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function Contact() {
  const zaloLink = "https://zalo.me/0333817395";

  const handleSubmit = async (values) => {
    await api
      .post("/user/userRequest", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className=" min-h-screen bg-slate-900 flex flex-col items-center py-20 justify-between bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg')`,
      }}
    >
      <div>
        <h1 className=" text-5xl text-white ">Liên hệ tư vấn</h1>
      </div>
      <div className=" flex flex-col gap-y-3 lg:flex-row  w-11/12 justify-between bg-blue-950 p-8 m-8">
        <div className=" w-full lg:w-1/2 flex  justify-between gap-y-10 lg:flex-col ">
          <div className=" flex flex-col items-start ">
            <div className=" flex gap-x-3 pb-3 items-center">
              <img src={logo} alt="" className=" size-14 bg-black" />
              <h1 className=" text-orange-600 font-bold text-3xl">XYZ TEAM</h1>
            </div>
            <div className="  flex items-center gap-x-1">
              <LocationOnIcon sx={{ color: "white", fontSize: 30 }} />
              <span className=" font-bold text-xs md:text-sm lg:text-lg">
                dhfjkaga
              </span>
              dhfjkaga
            </div>
            <div className="  flex items-center gap-x-1">
              <LocalPhoneIcon sx={{ color: "white", fontSize: 30 }} />
              <span className=" font-bold text-xs md:text-sm lg:text-lg">
                jdngljangl
              </span>
              jdngljangl
            </div>
            <div className="  flex items-center gap-x-1">
              <EmailIcon sx={{ color: "white", fontSize: 30 }} />
              <span className=" font-bold text-xs md:text-sm lg:text-lg">
                support@chungkhoanxyz@gmail.com
              </span>
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center flex-1 ">
            <h1 className=" font-extrabold hidden sm:block">TƯ VẤN MIỄN PHÍ</h1>
            <h1 className=" bg-orange-600 w-fit px-5 py-2 font-extrabold rounded-lg text-sm md:text-lg hidden sm:block">
              HOTLINE 012345678
            </h1>
            <div className=" flex flex-col sm:flex-row">
              <a
                href={zaloLink}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
              >
                <img src={zaloIcon} alt="Zalo" className=" size-14" />
              </a>
              <a
                href={zaloLink}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
              >
                <FacebookIcon sx={{ fontSize: 60, color: "white" }} />
              </a>
            </div>
          </div>
        </div>
        <div className="  w-full lg:w-1/2 ">
          {/* <h1>LIÊN HỆ NGAY</h1> */}
          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
