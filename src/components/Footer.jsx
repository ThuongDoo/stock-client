import React from "react";

import zaloIcon from "../images/icons8-zalo-48.png";

const Footer = () => {
  const zaloLink = "https://zalo.me/0333817395";
  return (
    <footer className=" bg-white dark:bg-slate-900 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
            <p className=" text-gray-400 text-sm">
              {/* &copy; 2024 Your Company. All rights reserved. */}
              &copy; Nền tảng được xây dựng và phát triển bởi XYZ Team
            </p>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right">
            <ul className="inline-flex">
              <li className="mr-4">
                <a
                  href="#d"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mr-4">
                <a
                  href="#d"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href={zaloLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
                >
                  <img src={zaloIcon} alt="Zalo" className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
