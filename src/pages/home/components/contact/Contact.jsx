import React from "react";
import ContactForm from "./components/ContactForm";
import api, { endpoints } from "../../../../utils/api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { STRINGS } from "../../../../constants/strings";

function Contact() {
  const handleSubmit = async (values) => {
    await api
      .post(endpoints.USER_REQUEST, values)
      .then((res) => {
        console.log(res.data);
        toast.success(STRINGS.REQUEST_CREATED);
      })
      .catch((err) => {
        console.log(err);
        toast.error(STRINGS.REQUEST_CREATE_FAILED);
      });
  };

  return (
    <div
      className=" relative min-h-screen  flex flex-col items-center justify-center  text-white"
      // style={{
      //   backgroundImage: `url('https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg')`,
      // }}
    >
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
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
