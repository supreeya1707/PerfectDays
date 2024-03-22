"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

// import Clock from "./clock";
// import Clock from "react-live-clock";

function FeelingPage() {
  const [btnchang, setbtnchang] = useState(" ");
  const router = useRouter();
  const pathUrl: any = process.env.pathUrl;
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");
  const transaction_id = searchParams.get("transaction_id");
  const getBTN = (e: any) => {
    // setMessage(e);

    setbtnchang(e.target.value);

    console.log("value is btn:", e.target.value);
  };
  const upDateEmotion = async (e: number) => {
    // setMessage(e);
    const res: any = await axios.put(
      `${pathUrl}/perfectdays/${transaction_id}`,
      {
        emotion: e,
      }
    );
    if (res.data.ok) {
      router.replace('/checkin/perfectdays?cid='+cid)
    }
  };
  console.log("BTN", btnchang);
  const postData = async () => {
    const dataSend = {
      emotion: btnchang,
    };
    console.log("datasend", dataSend);
    const res = await axios.put(
      `${pathUrl}/perfectdays/${transaction_id}`,
      dataSend
    );

    console.log("res send data", res.data);

    if (res.data.ok) {
      // alert("บันทึกข้อมูลสำเร็จ");
      Swal.fire({
        title: "SUCCESS!",
        text: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        allowOutsideClick: false,

        // confirmButtonText: "รับทราบ!",
      });
      console.log("res : ", res.data);

      location.reload();
      router.push("/checkin/perfectdays?cid=" + cid);
    } else {
      throw new Error(res.data.error);
    }
  };
  useEffect(() => {
    const initial = async () => {
      const res = await axios.get(`${pathUrl}/worker/getdataworker/${cid}`);
      console.log(res.data);
      if (res.data.ok) {
      }
    };
    initial();
  }, []);
  return (
    <div className="containner ">
      <div className="bg-local  bgImgback grid grid-cols-1">
        <div className=" mophlogo ">
          <Image
            src="/image/MOPH 4.png"
            alt={""}
            width={47}
            height={48}
          ></Image>
        </div>
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
                className="grid grid-cols-1 gap-1 justify-items-center cursor-pointer"
              >
                {/* <Button
                  className="w-[68px] h-[65px] bg-center bg-cover bg-transparent bg-[url('/image/Group1016.png')] "
                  value="4"
                  id="Perfect"
                  // onClick={(ev: any) => getBTN(ev)}
                ></Button> */}
                <Image
                  src="/image/Group1016.png"
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
              <div className="grid grid-cols-3 gap-4 justify-items-center ">
                <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                  <Button
                    className="w-[68px] h-[65px] bg-center bg-cover bg-transparent bg-[url('/image/happy.png')] "
                    value="3"
                    id="happy"
                    onClick={(ev: any) => getBTN(ev)}
                  ></Button>
                  {/* <Image
                    src="/image/happy.png"
                    alt={""}
                    width={68}
                    height={65}
                  ></Image> */}
                  <label
                    className="text-[16px] font-bold  text-[#D43A7B] "
                    id="happy"
                  >
                    Happy
                  </label>
                </div>
                <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                  <Button
                    className="w-[68px] h-[65px] bg-center bg-cover bg-transparent bg-[url('/image/everage.png')] "
                    value="2"
                    id="Everage"
                    onClick={(ev: any) => getBTN(ev)}
                  ></Button>

                  <label
                    className="text-[16px] font-bold  text-[#389F2F] "
                    id="Everage"
                  >
                    Everage
                  </label>
                </div>
                <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                  <Button
                    className="w-[68px] h-[65px] bg-center bg-cover bg-transparent bg-[url('/image/poor.png')] "
                    value="1"
                    id="poor"
                    onClick={(ev: any) => getBTN(ev)}
                  ></Button>
                  {/* <Image
                    src="/image/poor.png"
                    alt={""}
                    width={68}
                    height={65}
                  ></Image> */}
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
    </div>
  );
}

export default FeelingPage;
