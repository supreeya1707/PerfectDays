import React from 'react'
import Image from "next/image";
import { Input } from "@/components/ui/input";


function TimeLinePage() {
  return (
    <div className="container">
      <div className="w-[399px] grid grid-flow-row    w-full">
        <Image
          className="  "
          style={{ height: "100%", width: "100%" }}
          src="/perfectdays2/image/head.png"
          width={0}
          height={0}
          alt=""
          sizes="100vw"
          // fill={true}
        ></Image>
      </div>
      <div className="flex justify-items-center self-start">
        <Input type="date" className="w-[228px] h-[22]"></Input>
      </div>
    </div>
  );
}

export default page