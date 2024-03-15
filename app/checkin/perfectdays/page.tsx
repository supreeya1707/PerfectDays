"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";
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
          setcheckclockout(res.data.message[0].checkclockout);
          // setName( res.data.message[0].fname + " "+res.data.message[0].lname);

          console.log("checkclockin",data.fname)
        });
      }
    };
    initial();
  });

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
          {distance > 300 && (
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
              <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
                OUT OF RANGE
              </Button>
            </div>
          )}
          {distance < 300 &&
            checkclockin == null && (
              <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                <Button className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl cursor-pointer">
                  CLOCK IN
                </Button>
              </div>
            ) }
          {checkclockin != null && checkclockout != null && (
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center ">
              <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                <label className="text-center  text-[40px] text-[#3956BF] ">
                  {data.clockin}
                </label>
              </div>
              <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                <label className="text-center  text-[40px] text-[#056839] ">
                  {data.clockout}
                  {/* {data.clockout.slice(0, 5)} */}
                </label>
              </div>
            </div>
          )}
          {/* {distance < 300 && checkclockin != null && checkclockout == null && (
            <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center ">
              {/* <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                <label className="text-center  text-[40px] text-[#3956BF] ">
                  {data.clockin.slice(0, 5)}
                </label>
              </div> */}
              {/* <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                <label className="text-center  text-[40px] text-[#3956BF] ">
                  {data.clockin.slice(0, 5)}
                </label>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6 mt-2">
                <Button className="border-4 bg-[#056839] border-gray w-[178px] h-[58px] rounded-lg text-lg ">
                  CLOCK OUT
                </Button>
              </div>
            </div>
          )} */}

          {/* <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
            <label className="text-center  text-[40px] text-[#3956BF] ">
              08:14
            </label>
          </div>
          <div className=" mt-2 flex items-center justify-center    border-4 rounded-lg p-2  border-[#056839] w-[220px] h-[49px]">
            <label className="text-center  text-[40px] text-[#056839] ">
              16:45
            </label>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
            <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg ">
              OUT OF RANGE
            </Button>
          </div> */}
          {/* <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
            <Button className="border-4 bg-[#056839] border-white w-[178px] h-[58px] rounded-lg text-lg ">
              CLOCK OUT
            </Button>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
            <Button className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl cursor-pointer">
              CLOCK IN
            </Button>
          </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default page;
