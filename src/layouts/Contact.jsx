import React from "react";
import ContactForm from "../components/forms/ContactForm";
import zaloIcon from "../images/zalo.png";
import api from "../utils/api";
import contactBackground from "../images/contactBackground.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "../images/logo.png";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function Contact() {
  const zaloLink = "https://zalo.me/g/cbgvag037";

  const handleSubmit = async (values) => {
    await api
      .post("/user/userRequest", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className=" relative min-h-screen  flex flex-col items-center justify-center  text-white"
      // style={{
      //   backgroundImage: `url('https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg')`,
      // }}
    >
      <img
        src="https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg"
        alt=""
        className=" absolute left-0 top-0 w-full h-full opacity-40 z-0"
      />
      <div className=" z-10 w-full flex flex-col items-center justify-center gap-y-3 p-4">
        <div>
          <h1 className=" text-5xl text-white ">Liên hệ tư vấn</h1>
        </div>
        <div className="  w-full lg:w-1/2 bg-blue-900 p-6 rounded-xl shadow-black shadow-2xl ">
          {/* <h1>LIÊN HỆ NGAY</h1> */}
          <ContactForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
