"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
// import Clock from "./clock";
// import Clock from "react-live-clock";

function page() {
  return (
    <div className="containner ">
      <div className="bg-local  bgImgback grid grid-cols-1">
        <div className=" mophlogo ">
          <Image
            src="/image/MOPH 4.png"
            alt={""}
            width={47}
            height={48}
          ></Image>
        </div>
        <div className=" grid grid-cols-1  justify-self-center">
          <Image
            className="flex items-center self-start ml-1  rounded-full border-[15px] border-[#F26B22] "
            src="/image/personal w.png"
            alt={""}
            width={130}
            height={135}
          ></Image>
        </div>
        <div className=" grid grid grid-flow-row auto-rows-max justify-self-center  ">
          {/* <div className=" grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1  items-center"> */}
          <div className="textdescrip text-2xl mt-2">
            <h3>สุปรีญา เลิศปาน</h3>
          </div>

          <div className="text-dep  text-center text-gray-300 ">
            <h3>นักวิชาการคอมพิวเตอร์ปฏิบัติการ</h3>
          </div>
          {/* <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
            <label className="text-center  text-[40px] text-[#3956BF] ">
              08:14
            </label>
          </div>
          <div className=" mt-2 flex items-center justify-center    border-4 rounded-lg p-2  border-[#056839] w-[220px] h-[49px]">
            <label className="text-center  text-[40px] text-[#056839] ">
              16:45
            </label>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
            <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg ">
              OUT OF RANGE
            </Button>
          </div> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
            <Button className="border-4 bg-[#056839] border-white w-[178px] h-[58px] rounded-lg text-lg ">
              CLOCK OUT
            </Button>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
            <Button className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl">
              CLOCK IN
            </Button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default page;
