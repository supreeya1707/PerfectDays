import React from 'react'
import Image from "next/image";
import { Input } from "@/components/ui/input";


function TimeLinePage() {
  return (
    <div className="container">
      <div className=" grid  grid-flow-row  justify-self-center ">
        <div className='flex  flex-nowrap'>
           <Image
          className="w-[396px]"
          src="/perfectdays2/image/head.png"
     
          alt={""}
          width={5000}
          height={214}
        ></Image>
        </div>
       
      </div>
      <div className="flex justify-items-center self-start">
        <Input type="date" className="w-[228px] h-[22]"></Input>
      </div>
    </div>
  );
}

export default TimeLinePage;