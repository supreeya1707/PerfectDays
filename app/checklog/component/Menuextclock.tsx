import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Extcomment from "./Extcomment";
import axios from "axios";
import Overtime from "./overtime";

interface dataProps {
  line: string;
  datacid: string;
  profile: Profile;
  fn: any;
}
interface Profile {
  userId: string;
  displayName: string;
  pictureUrl: string;
}

const Menuextclock = ({ line, datacid, profile, fn }: dataProps) => {
  const pathUrl: any = process.env.pathUrl;
  const router = useRouter();
  const searchParams = useSearchParams();
  const cid = searchParams.get("datacid");
  const [data, setData] = useState<any>({});
  const [steponext, setStepext] = useState(0);
  console.log("CID: " +datacid);
   const PageExt = async () => {

      <Overtime line={line} datacid={datacid} profile={profile} />;
   };
    
  return (
    <div className="mb-24">
      <div className="flex flex-col  items-center mb-20 ">
        <div className="justify-items-center">
          <Button
            className="border-4 bg-[#3956BF] border-gray w-[228px] h-[58px] text-[24px] cursor-pointer"
            onClick={() => fn(3)}
          >
            Ext. CLOCK IN
            {/* <Overtime line={line} datacid={datacid} profile={profile}/> */}
          </Button>
        </div>
        <div className="justify-items-center">
          <Button className="border-4 bg-[#531805] border-gray w-[228px] h-[58px] rounded-lg text-[24px]  ">
            Over Time (OT)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menuextclock;

/* botton */
