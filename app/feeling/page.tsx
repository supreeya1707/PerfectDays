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
        <div className="grid grid-cols-1 justify-items-center    ">
          <div className="border-2 rounded-lg bg-[#E5F4FF] border-[#437687] w-[292px] h-[305px] ">
            <div className="border-2 pl-2 m-2  rounded-lg bg-[#87B5D7] border-[#000000] w-[277px] h-[55px] text-center  ">
              <label className=" text-[22px] m-2 ">
                วันนี้คุณเป็นอย่างไรบ้าง ?
              </label>
            </div>
            <div className="row mt-5 ">
              <div className="grid grid-cols-1 gap-1 justify-items-center">
                <Image
                  src="/image/Group1016.png"
                  alt={""}
                  width={68}
                  height={68}
                ></Image>
                <label className="text-[18px] font-bold text-[#0093D2] ">
                  Perfect Day
                </label>
              </div>
            </div>
            <div className="row mt-5">
              <div className="grid grid-cols-3 gap-4 justify-items-center ">
                <div className="grid grid-cols1 grid-rows-2 justify-items-center">
                  <Image
                    src="/image/happy.png"
                    alt={""}
                    width={68}
                    height={65}
                  ></Image>
                  <label className="text-[16px] font-bold  text-[#D43A7B] ">
                    Happy
                  </label>
                </div>
                <div className="grid grid-cols1 grid-rows-2 justify-items-center">
                  <Image
                    src="/image/everage.png"
                    alt={""}
                    width={68}
                    height={65}
                  ></Image>
                  <label className="text-[16px] font-bold  text-[#389F2F] ">
                    Everage
                  </label>
                </div>
                <div className="grid grid-cols1 grid-rows-2 justify-items-center">
                  <Image
                    src="/image/poor.png"
                    alt={""}
                    width={68}
                    height={65}
                  ></Image>
                  <label className="text-[16px] font-bold  text-[#764416] ">
                    Poor
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
