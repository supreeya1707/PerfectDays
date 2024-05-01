"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { useRouter, useSearchParams } from "next/navigation";
// import frontcard from "@/app/choose/components/frontcard"
import PerfectdaysPage from "../perfectdays/page";
import Extclockpage from "../Extclock/page";
// import Clock from "./clock";
// import Clock from "react-live-clock";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
function ChoosePage() {
  const searchParams = useSearchParams();
   const cid = searchParams.get("cid");
   const lineID = searchParams.get("lineid");
  const data = {cid: '1329900007811', name: 'mikung'}
  const router = useRouter(); 
  console.log("CID",cid);
  const getlinkcheckin = async () => {
    // router.push("/checkin/Extclock");

  };
   const Flipback = async () => {
     router.replace("/checkin/perfectdays?cid="+cid+"&lineid="+lineID);
   };
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

        <div className="flex flex-col items-center gap-4 ">
          <Dialog>
            <div className="  justify-items-center">
              <DialogTrigger asChild>
                <Button
                  className="border-4 rounded-lg bg-[#531805] border-white w-[228px] h-[56px] text-lg"
                  onClick={getlinkcheckin}
                >
                  Ext. CLOCK IN
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[1500px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <Extclockpage/>
                {/* <div className=" bg-local bgImgback grid grid-cols-1 "></div> */}
                {/* <div className="  "> */}

                {/* <PerfectdaysPage mikung={cid} /> */}
                {/* </div> */}
              </DialogContent>
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
              <Button
                className="border-4 rounded-lg bg-[#531805] border-white w-[228px] h-[56px] text-lg"
                onClick={getlinkcheckin}
              >
                Work From Home
              </Button>
            </div>
          </Dialog>
        </div>

        <div className="absolute  -bottom-2 right-2 ">
          <Image
            className="mt-2 cursor-pointer"
            onClick={Flipback}
            // src="/image/personal w.png"
            src="/perfectdays2/image/repeat 1.png"
            alt={""}
            width={58}
            height={58}
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default ChoosePage;
