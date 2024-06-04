"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";



interface dataProps {
  line: string;
  datacid: string;
  profile: Profile;
    fn: any;
    emo: any;
}
interface Profile {
  userId: string;
  displayName: string;
  pictureUrl: string;
}
const MenuEmotion = ({ line, datacid, profile, fn, emo }: dataProps) => {
  const pathUrl: any = process.env.pathUrl;
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
    const initial = async () => {
      setLoading(true);
      const res = await axios.get(`${pathUrl}/worker/getdataworker/${datacid}`);
      console.log(res.data);
    
       setData(res.data.message[0]);
    
      setLoading(false);
      // await liff.init({ liffId: idcardliff }).then(async () => {
      //   const profile = await liff.getProfile();
      //   console.log("Profile", profile);
      // });
    };
console.log("DATA",data)
    useEffect(() => {
      initial();
    
      // console.log("datadis", distance);

      // }, [seconds, minutes, hours, date]);
    }, []);
  const upDateEmotion = async (e: number) => {
    // setMessage(e);
    const res: any = await axios.put(
      `${pathUrl}/perfectdays/${data.transaction_id}`,
      {
        emotion: e,
      }
    );
    if (res.data.ok) {
      Swal.fire({
        title: "SUCCESS!",
        text: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        allowOutsideClick: false,

        // confirmButtonText: "รับทราบ!",
      });
      // router.replace("/checkin/perfectdays?cid=" + cid);
      // location.reload();
      // getData();
    }
    fn(1)
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 justify-items-center    ">
        <div className="border-2 rounded-lg bg-[#E5F4FF] border-[#437687] w-[292px] h-[305px] ">
          <div className="border-2 pl-2 m-2  rounded-lg bg-[#87B5D7] border-[#000000] w-[277px] h-[55px] text-center  ">
            <label className=" text-[22px] m-2 ">
              วันนี้คุณเป็นอย่างไรบ้าง ?
            </label>
          </div>
          <div className="row mt-5 ">
            <div
              onClick={() => upDateEmotion(4)}
              // onClick={() => emo(4) }
              className="grid grid-cols-1 gap-1 justify-items-center cursor-pointer"
            >
              <Image
                src="/perfectdays2/image/Group1016.png"
                alt={""}
                width={68}
                height={65}
              ></Image>
              <label
                className="text-[18px] font-bold text-[#0093D2]  "
                id="Perfect"
                htmlFor="Perfect"
              >
                Perfect Day
              </label>
            </div>
          </div>
          <div className="row mt-5">
            <div className="grid grid-cols-3 gap-4 justify-items-center  ">
              <div
                // onClick={() => emo(3)}
                onClick={() => upDateEmotion(3)}
                className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer"
              >
                {/* <Button
                      className="w-[68px] h-[65px] bg-center bg-cover bg-transparent bg-[url('/image/happy.png')] "
                      value="3"
                      id="happy"
                      // onClick={(ev: any) => getBTN(ev)}
                    ></Button> */}
                <Image
                  src="/perfectdays2/image/happy.png"
                  alt={""}
                  width={68}
                  height={65}
                ></Image>
                <label
                  className="text-[16px] font-bold  text-[#D43A7B] "
                  id="happy"
                >
                  Happy
                </label>
              </div>
              <div
                // onClick={() => emo(2)}
                onClick={() => upDateEmotion(2)}
                className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer"
              >
                <Image
                  src="/perfectdays2/image/everage.png"
                  alt={""}
                  width={68}
                  height={65}
                ></Image>
                <label
                  className="text-[16px] font-bold  text-[#389F2F] "
                  id="Everage"
                >
                  Everage
                </label>
              </div>
              <div
                // onClick={() => emo(1)}
                onClick={() => upDateEmotion(4)}
                className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer"
              >
                {/* <Button
                      className="w-[68px] h-[65px] bg-center bg-cover bg-transparent bg-[url('/image/poor.png')] "
                      value="1"
                      id="poor"
                      // onClick={(ev: any) => getBTN(ev)}
                    ></Button> */}
                <Image
                  src="/perfectdays2/image/poor.png"
                  alt={""}
                  width={68}
                  height={65}
                ></Image>
                <label
                  className="text-[16px] font-bold  text-[#764416] "
                  id="poor"
                >
                  Poor
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuEmotion;
