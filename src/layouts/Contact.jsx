import React from "react";
import ContactForm from "../components/ContactForm";
import zaloIcon from "../images/icons8-zalo-48.png";

function Contact() {
  const zaloLink = "https://zalo.me/0333817395";

  return (
    <div
      className=" h-screen bg-slate-900 flex flex-col items-center py-20 justify-between bg-cover bg-center"
      style={{
        backgroundImage: `url("https://c0.wallpaperflare.com/preview/955/464/977/backgrounds-flatlay-craft-diy-school.jpg")`,
      }}
    >
      <div>
        <h1 className=" text-5xl">Liên hệ tư vấn</h1>
        <h1>Liên hệ ngay hôm nay để không bỏ lỡ các cơ hội đầu tư</h1>
      </div>
      <div className=" flex w-11/12 justify-between bg-blue-500 p-8">
        <div className=" w-1/2 flex flex-col">
          <div className=" flex flex-col items-start">
            <h1 className=" text-yellow-500 font-bold">
              CONG TY THNH ABCfadfdfadf
            </h1>
            <h1>
              <span className=" font-bold">Dia chi: </span>dhfjkaga
            </h1>
            <h1>
              <span className=" font-bold">SDT: </span>jdngljangl
            </h1>
            <h1>
              <span className=" font-bold">Email: </span>
              dhfjakfn@gmail.com
            </h1>
          </div>
          <div className=" flex flex-col items-center justify-center flex-1">
            <h1 className=" font-extrabold">TƯ VẤN MIỄN PHÍ</h1>
            <h1 className=" bg-yellow-500 w-fit px-5 py-2 font-extrabold rounded-sm">
              GỌI NGAY 012345678
            </h1>
            <a
              href={zaloLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
            >
              <img src={zaloIcon} alt="Zalo" className=" h-20 w-20" />
            </a>
          </div>
        </div>
        <div className=" w-1/2">
          <h1>LIÊN HỆ NGAY</h1>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
