import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  console.log("CID: " + datacid);
   const getData = async () => {
     const res = await axios.get(`${pathUrl}/worker/getdataworker/${datacid}`);
     console.log("res.data", res.data);
     if (res.data.ok) {
       setData(res.data.message[0]);
       // setDistance(distance)
       // console.log("ระยะห่าง", distance);
     }
   };
   useEffect(() => {
     getData();
   }, []);
   
    
  return (
    <div className="mb-24">
      <div className="flex flex-col  items-center mb-20 ">
        <div className="justify-items-center">
          {data.clockin != null && data.clockout == null && (
            
            <div>
              <Button
                className="border-4 bg-[#056839] border-gray w-[228px] h-[58px] text-[24px] cursor-pointer"
                onClick={() => fn(3)}
              >
                Ext. CLOCK OUT
              </Button>
              
            </div>
          )}
          {data.clockin==null && data.clockout==null &&(
            <div>
              <Button
                className="border-4 bg-[#3956BF] border-gray w-[228px] h-[58px] text-[24px] cursor-pointer"
                onClick={() => fn(3)}
              >
                Ext. CLOCK IN
              </Button>
            </div>
          )}

          {/* Ext. CLOCK IN
            {/* <Overtime line={line} datacid={datacid} profile={profile}/> */}
          {/* </Button> */}
        </div>
        {data.clockin != null && data.clockout != null ?
          (
        <div className="justify-items-center">
          <Button
            className="border-4 bg-[#531805] border-gray w-[228px] h-[58px] rounded-lg text-[24px]  "
            onClick={() => fn(4)}
          >
            Over Time (OT)
          </Button>
        </div>
        ): null}
        
      </div>
    </div>
  );
};

export default Menuextclock;

/* botton */
