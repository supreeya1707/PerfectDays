"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
// import Clock from "./clock";
// import Clock from "react-live-clock";

function ChoosePage() {
  return (
    <div className="containner ">
      <div className="bg-local  bgImgback grid grid-cols-1">
        <div className="  mophlogo ">
          <Image
            src="/perfectdays2/image/MOPH 4.png"
            alt={""}
            width={47}
            height={48}
          ></Image>
        </div>
        <div className="flex flex-col justify-items-center ">
          <div className=" flex flex-row ">
            <Button className="border-4 rounded-lg bg-[#531805] border-white w-[228px] h-[56px] text-lg">
              Ext. CLOCK IN
            </Button>
          </div>
          <div className="mt-1">
            <Button className="border-4 rounded-lg bg-[#531805] border-white w-[228px] h-[56px] text-lg">
              Over Time (OT)
            </Button>
          </div>
          <div>
            <Button className="border-4 rounded-lg bg-[#531805] border-white w-[228px] h-[56px] text-lg">
              อบรมนอกสถานที่
            </Button>
          </div>
          <div>
            <Button className="border-4 rounded-lg bg-[#531805] border-white w-[228px] h-[56px] text-lg">
              Work From Home
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-4 auto-rows-min gap-y-2 justify-center content-start"></div>
      <div className=" place-self-end">
        <Image
          src="/perfectdays2/image/repeat 1.png"
          alt={""}
          width={47}
          height={48}
        ></Image>
      </div>
    </div>
  );
}

export default ChoosePage;
