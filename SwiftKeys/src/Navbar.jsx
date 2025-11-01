import React from "react";
import { useState } from "react";

const Navbar = () => {
  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="my-8 p-4 text-blue-50 font-[Quicksand] bg-[#e2dfdb0c] shadow-2xl border-black border-solid border-[0.1px] rounded-2xl flex justify-between items-center">
          <div className="text-2xl">SwiftKeyss</div>
          <div className="">
            <ul className="flex justify-center items-center gap-8">
              <li className="hover:cursor-pointer ">
                <button className="border-white rounded-2xl border-solid border-1 p-2 transform transition ease-in-out duration-500 hover:bg-amber-50 hover:text-[black] hover:cursor-pointer ">
                  Mode
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
