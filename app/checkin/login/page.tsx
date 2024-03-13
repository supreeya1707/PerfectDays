"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { Input } from "@/components/ui/input";
// import Clock from "./clock";
// import Clock from "react-live-clock";

function page() {
  return (
    <div className="containner  ">
      <div className=" grid grid-cols-auto  justify-self-center ">
        <Image
          className="flex justify-items-center self-start "
          src="/image/PerfectDay_head 1.png"
          alt={""}
          width={390}
          height={214}
        ></Image>
      </div>
      <div className=" bgblue grid grid grid-flow-row auto-rows-max justify-self-center content-start  ">
        <div className="mt-5 w-[239px]  h-[41px]  ">
          <Input type="username" placeholder="username" />
        </div>
        <div className="mt-5 w-[239px]  h-[41px] grid grid-cols-auto  justify-self-center ">
          <Input type="password" placeholder="password " />
        </div>
        <div className="mt-5 w-[175px]  h-[41px] grid grid-cols-auto  justify-self-center ">
          <Button className="border-2 bg-[#F26B22] border-white">Login</Button>
        </div>
      </div>
    </div>
  );
}

export default page;
