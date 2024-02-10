import React from "react";

import zaloIcon from "../images/icons8-zalo-48.png";

const Footer = () => {
  return (
    <footer className=" bg-white dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-4 md:mb-0">
            <p className="text-white">
              &copy; 2024 Your Company. All rights reserved.
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
                  href="#r"
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
