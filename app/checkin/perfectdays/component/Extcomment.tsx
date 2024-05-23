import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const Extcomment = () => {
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
        <div className="container mb-20">
          <div className="flex flex-col  items-center gap-2  ">
            <div className="justify-items-center">
              <Button className="border-4 bg-[#E97132] border-gray w-[228px] h-[56px] text-[24px] cursor-pointer shadow-lg rounded-lg ">
                อบรมนอกสถานที่
              </Button>
            </div>
            <div className="justify-items-center">
              <Button className="border-4 bg-[#E97132] border-gray w-[228px] h-[56px] text-[24px] cursor-pointer shadow-lg rounded-lg ">
                Work From Home
              </Button>
            </div>
            <div className="justify-items-center ">
              <Button className="border-4 bg-[#8C123E] border-gray w-[228px] h-[56px] text-[16px] cursor-pointer shadow-lg rounded-lg  ">
                ออกนอกสถานที่มาแล้ว
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="container  pt-[100px] w-full">
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
                  onClick={() => initial()}
                >
                  UPDATE พิกัดอีกครั้ง
                </Button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
};

export default Extcomment;
