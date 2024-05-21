import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const Overtime = () => {
  return (
    // <div className="">
    //   <div className="bg-local  bgImgback grid grid-cols-1">
    //     <div className="flex flex-col mb-10">
    //       <div className="absolute top-[170px] left-[60px]">
    //         <Image
    //           src="/perfectdays2/image/MOPH 4.png"
    //           alt={""}
    //           width={47}
    //           height={48}
    //         ></Image>
    //       </div>
    //     </div>

    //     <div className="flex flex-col  items-center gap-4 mt-12 ">
    //       <div className="flex flex-row justify-around items-stretch ">
    //         <div className="basis-4/6  justify-center  ">
    //           <label className=" text-3xl   text-[#3956BF] ">OVERTIME</label>
    //         </div>
    //       </div>
    //       <div className=" flex flex-row justify-around ">
    //         <Button className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl cursor-pointer">
    //           CLOCK IN
    //         </Button>
    //       </div>
    //       <div className=" flex flex-row justify-around ">
    //         <Button className="border-4 bg-[#056839] border-gray w-[178px] h-[58px] rounded-lg text-3xl  ">
    //           CLOCK OUT
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="containner mt-10 pt-10">
      {/* <div className="bg-local  bgImgback grid grid-cols-1"> */}
       

        <div className="flex flex-col items-center gap-4 ">
          <div className="  justify-items-center">
            <label className=" text-3xl   text-[#3956BF] ">OVERTIME</label>
          </div>
          <div className="mt-1">
            <Button className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl cursor-pointer">
              CLOCK IN
            </Button>
          </div>
          
          {/* <div>
            <Button className="border-4 bg-[#056839] border-gray w-[178px] h-[58px] rounded-lg text-3xl  ">
              CLOCK OUT
            </Button>
          </div>
          <div>
            <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
              OUT OF RANGE
            </Button>
          </div> */}
        </div>

        <div className="absolute  -bottom-2 right-2 ">
          <Image
            className="mt-2 cursor-pointer"
            // src="/image/personal w.png"
            src="/perfectdays2/image/repeat 1.png"
            alt={""}
            width={58}
            height={58}
          ></Image>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Overtime;
