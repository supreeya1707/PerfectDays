import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react'

import Image from "next/image";
import liff from '@line/liff';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { profile } from 'console';

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
function page({line,datacid,profile}: dataProps) {
  const pathUrl: any = process.env.pathUrl;
  // const [profile, setProfile] = useState<any>({});
  const [lineId, setLineId] = useState("");
  const API_KEY: any = process.env.API_KEY;
  const idcardliff: any = process.env.idcardliff;
  const [image, setimage] = useState("");
  const [data, setData] = useState<any>({});
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");
  const lineID = searchParams.get("lineid");
  const getProfile = async () => {
    await liff.init({ liffId: idcardliff }).then(async () => {
      const profile:any = await liff.getProfile();

        
      // const idToken=liff.getIdToken();
      console.log("Profile", profile);
      
      setLineId(profile?.userId);
      setimage(profile?.pictureUrl);
      console.warn(lineId);
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
  },[]);
  return (
    <div className=" bg-local bgImgback grid grid-cols-1 ">
      {/* <div className=" mophlogo "> */}
      <div className="flex flex-col">
        <div className="absolute top-[170px] left-[120px]">
          <Image
            src="/perfectdays2/image/MOPH 4.png"
            alt={""}
            width={47}
            height={48}
          ></Image>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-items-center">
          <div className="basis-4/6  justify-center">
            <Image
              className="  rounded-full border-[15px] border-[#F26B22] "
              // src="/image/personal w.png"
              // src={profile?.pictureUrl}
              src={image}
              alt={""}
              width={130}
              height={135}
            ></Image>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="textdescrip text-2xl mt-2">
          <h3>{data.fname + " " + data.lname}</h3>
        </div>
      </div>
      <div className="">
        {line} {datacid}
        {profile.pictureUrl}
      </div>

      {/* </div> */}
    </div>
  );
}

export default page