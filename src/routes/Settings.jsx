import React from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";

function Settings() {
  return (
    <div className=" bg-slate-900 min-h-screen">
      <div className=" px-8 pb-4 absolute w-full z-50">
        <Header />
      </div>
      {/* <div>
        <TabBar />
      </div> */}
    </div>
  );
}

export default Settings;
