'use client';
import { useEffect, useState } from 'react'
import Menu from './component/menu'
import Overtime from './component/overtime'
import Checkintime from './component/checkintime'
import Image from "next/image";
import extclock from './component/extclock';
import Menuextclock from './component/Menuextclock';
import Extcomment from './component/Extcomment';
import { Button } from '@/components/ui/button';


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
const page = () => {

  const [step, setStep] = useState(1);
 
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [date, setDate] = useState("date");
  useEffect(() => {
    //   initial();
    //   getProfile();
    // console.log("datadis", distance);
    const intervalId = setInterval(() => {
      let d = new Date();
      var h = d.getHours().toString();
      var m = d.getMinutes().toString();
      var s = d.getSeconds().toString();

      var z =
        d.getDate().toString().padStart(2, "0") +
        " / " +
        (d.getMonth() + 1).toString().padStart(2, "0") +
        " / " +
        d.getFullYear();
      setDate(z);
      setHours(h.padStart(2, "0"));
      setMinutes(m.padStart(2, "0"));
      setSeconds(s.padStart(2, "0"));

      return () => clearInterval(intervalId);
    }, 1000);

    // }, [seconds, minutes, hours, date]);
  }, []);
  return (
    <div>
      <div className="">
        <div className="bg-local  bgImgback grid grid-cols-1">
          <div className="ml-16 mt-20 pt-24 ">
          {/* <div className="mophlogo"> */}
            <Image
              className=""
              src="/perfectdays2/image/MOPH 4.png"
              alt={""}
              width={47}
              height={48}
            ></Image>
          </div>

          {/* {step === 1 && <Menuextclock />} */}
        </div>
      </div>
      {/* Show time and buttom refresh  gps now */}
      <div className="  pt-[620px] w-full">
        <div className="flex flex-col items-center">
          <div className="flex flex-row">
            <div className="justify-self-center  text-4xl">
              {hours}:{minutes}:{seconds}
            </div>
          </div>

          <div className="flex flex-col items-center mt-5">
            <div className="flex flex-row">
              <Button
                className="bg-[#30485E] text-[16px] w-[321px]  "
                
              >
                UPDATE พิกัดอีกครั้ง
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page