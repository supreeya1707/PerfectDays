"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { useRouter, useSearchParams } from "next/navigation";
// import frontcard from "@/app/choose/components/frontcard"
import PerfectdaysPage from "../perfectdays/page";
// import Extclockpage from "../Extclock/page";
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
import liff from "@line/liff";
import axios from "axios";



interface dataProps {
  line: string;
  datacid: string;
  profile: Profile;
}
interface Profile {
  userId: string;
  displayName: string;
  pictureUrl: string;
}

function ChoosePage({ line, datacid, profile }: dataProps) {
  const pathUrl: any = process.env.pathUrl;
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");
  const lineID = searchParams.get("lineid");
  const idcardliff: any = process.env.idcardliff;
  const [data, setData] = useState<any>({});
  const [lineId, setLineId] = useState("");
  // const [profile, setProfile] = useState<any>({});
  const [profileid, setProfileid] = useState<any>({});
  const [image, setimage] = useState("");
  // const data = {cid: '1329900007811', name: 'mikung'}
  const router = useRouter();
  console.log("CID", cid);
  const getlinkcheckin = async () => {
    // router.push("/checkin/Extclock");
  };
  const Flipback = async () => {
    router.replace("/checkin/perfectdays?cid=" + cid + "&lineid=" + lineID);
  };
  const getProfile = async () => {
    await liff.init({ liffId: idcardliff }).then(async () => {
      const profile:any = await liff.getProfile();

      // const idToken=liff.getIdToken();
      console.log("Profile", profile);
      setProfileid(profile);
      setLineId(profile?.userId);
      setLineId(profile?.userId);
      console.warn(lineId);
      setimage(profile?.pictureUrl);
    });
    await liff.ready;
    
  };
  const getData = async () => {
    const res = await axios.get(`${pathUrl}/worker/getdataworker/${cid}`);
    console.log(res.data);
    if (res.data.ok) {
      setData(res.data.message[0]);
      // setDistance(distance)
      // console.log("ระยะห่าง", distance);
    }
  };
  useEffect(() => {
    getProfile();
  });

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

                {/* <Extclock
                  line="123"
                  datacid="123456"
                  profile={profileid}
                ></Extclock> */}
                {/* <Extclockpage
                  line="123"
                  datacid="123456789"
                  profile={profileid?.pictureUrl}
                /> */}
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
