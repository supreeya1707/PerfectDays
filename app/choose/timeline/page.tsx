import React from 'react'
import Image from "next/image";
import { Input } from "@/components/ui/input";


function page() {
  return (
    <div className="container">
      <div className=" grid grid grid-flow-row auto-rows-max justify-self-center content-start">
        <Image
          className="grid grid-cols-1 justify-items-center self-start  "
          src="/image/head.png"
          
          width={500}
          height={10} alt={''}          // fill={true}
        ></Image>
      </div>
      <div className="flex justify-items-center self-start">
        <Input type="date" className="w-[228px] h-[22]"></Input>
      </div>
    </div>
  );
}

export default page