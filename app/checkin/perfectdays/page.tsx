"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";
import { Clock } from "@/app/clock";
import Swal from "sweetalert2";
// import Clock from "./clock";
// import Clock from "react-live-clock";=
function page() {
  const searchParams = useSearchParams();
  const cid = searchParams.get("cid");
  const pathUrl: any = process.env.pathUrl;
  const [lat1, setLat1] = useState<any>({});
  const [long1, setLong1] = useState<any>({});
  const [Lat2, setLat2] = useState<any>({});
  const [Long2, setLong2] = useState<any>({});
  const [distance,setDistance] = useState<any>({});
  const [checkclockin, setcheckclockin] = useState<any>({});
  const [checkclockout, setcheckclockout] = useState<any>({});
  const [name, setName] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [showclockin, setshowclockin] = useState<any>({});
  const [showclockout, setshowclockout] = useState<any>({});
  const [outrang, setOutrange] = useState<any>({});
  const [btncheckin, setbtncheckin] = useState<any>({});
  const [btncheckout, setbtncheckout] = useState<any>({});
  const [emotion, setEmotion] = useState(" ");
  const API_KEY: any = process.env.API_KEY;
  const r = 6371;

  function haversine(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371; // รัศมีของโลก (เช่น เมตร)

    console.log(lat1, lon1, lat2, lon2);
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  useEffect(() => {
    const initial = async () => {
      const res = await axios.get(`${pathUrl}/worker/getdataworker/${cid}`);
      console.log(res.data);
      if (res.data.ok) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          setLat1(position.coords.latitude);
          setLong1(position.coords.longitude);
          console.log("SET lat", position.coords.latitude);
          const d: number = haversine(
            res.data.message[0].organize_lat,
            res.data.message[0].organize_long,
            // 13.807305, 99.924653,
            position.coords.latitude,
            position.coords.longitude
          );
          setDistance(d*100);
          console.log("data", distance);
          setData(res.data.message[0]);
          setcheckclockin(res.data.message[0].clockin);
          setcheckclockout(res.data.message[0].clockout);
          // setName( res.data.message[0].fname + " "+res.data.message[0].lname);

          console.log("checkclockin",data.checkclockout)
        });
      }
    };
    initial();
  });
   const now = new Date();
const getEmotion = (e: any) => {
    // setMessage(e);
    setEmotion(e.target.value);

    console.log("value is Emotion:", e.target.value);
  };
  const postData = async () => { 
    
    const dataSend = {
      clockin:dayjs(new Date).format("HH:mm") ,
      // clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date).format("YYYY-MM-DD"),
      worker_id:data.id
    };
    console.log("datasend",dataSend);
    const res = await axios.post(`${pathUrl}/perfectdays`, dataSend);
   
    console.log("res send data", res.data)

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
    } else {
      throw new Error(res.data.error);
    }
  }
  console.log("transaction",data.transaction_id)
  const upsData = async () => { 
    
    const dataSend = {
      // clockin:dayjs(new Date).format("HH:mm") ,
      clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date).format("YYYY-MM-DD"),
      emotion:emotion,
      worker_id:data.id
    };
    console.log("datasend",dataSend);
   
    const res_up = await axios.put(
      `${pathUrl}/perfectdays/${data.transaction_id}`,
      dataSend
    );
    console.log("res send data", res_up.data)

    if (res_up.data.ok) {
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
      console.log("res : ", res_up.data);
      location.reload();
    } else {
      throw new Error(res_up.data.error);
    }
  }
  return (
    <div className="containner ">
      <div className="bg-local bgImgback grid grid-cols-1">
        <div className=" mophlogo ">
          <Image
            src="/image/MOPH 4.png"
            alt={""}
            width={47}
            height={48}
          ></Image>
        </div>
        <div className=" grid grid-cols-1  justify-self-center">
          <Image
            className="flex items-center self-start ml-1  rounded-full border-[15px] border-[#F26B22] "
            src="/image/personal w.png"
            alt={""}
            width={130}
            height={135}
          ></Image>
        </div>
        <div className=" grid grid grid-flow-row auto-rows-max justify-self-center  ">
          {/* <div className=" grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1  items-center"> */}
          <div className="textdescrip text-2xl mt-2">
            <h3>{data.fname + " " + data.lname}</h3>
          </div>

          <div className="text-dep  text-center text-gray-300 ">
            <h3>{data.position}</h3>
          </div>

          {checkclockin != null ? (
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
              <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                <label className="text-center  text-[40px] text-[#3956BF] ">
                  {data.clockin}
                </label>
              </div>
              {checkclockout != null ? (
                <div className="mt -3 grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                  <div className="mt-5 flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                    <label className="text-center  text-[40px] text-[#3956BF] ">
                      {data.clockout}
                    </label>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6 mt-2">
                    <Button
                      className="border-4 bg-[#056839] border-gray w-[178px] h-[58px] rounded-lg text-lg  "
                      onClick={upsData}
                    >
                      CLOCK OUT
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
              {distance < 300 ? (
                <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                  <Button
                    className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl cursor-pointer"
                    onClick={postData}
                  >
                    CLOCK IN
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                  <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
                    OUT OF RANGE
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-4 justify-items-center ">
        <div className="flex flex-col  justify-items-center my-[620px]">
          <Clock time={now.getTime()} />
          <label className="flex flex-col mt-2 mr-5  ">your location :</label>
        </div>
      </div>
    </div>
  );   
}

export default page;
