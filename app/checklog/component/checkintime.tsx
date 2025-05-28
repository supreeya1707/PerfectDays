"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";
import { Clock } from "@/app/clock";
import Swal from "sweetalert2";
import { InfinitySpin } from "react-loader-spinner";
import liff from "@line/liff";
import GetOSModule from "@line/liff/get-os";
import { profile } from "console";
import GetOS from "@line/liff/get-os";
import MenuEmotion from "./MenuEmotion";
import { positions } from "@mui/system";
// import Clock from "./clock";
// import Clock from "react-live-clock";=

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

const Checkintime = ({ line, datacid, profile, fn }: dataProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // console.log(line);
  console.log("ProfilePageCheckin",profile);
  const pathUrl: any = process.env.pathUrl;
  const [lat1, setLat1] = useState<any>({});
  const [long1, setLong1] = useState<any>({});
  const [Lat2, setLat2] = useState<any>({});
  const [Long2, setLong2] = useState<any>({});
  const [distance, setDistance] = useState<any>();
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
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [date, setDate] = useState("date");
  const API_KEY: any = process.env.API_KEY;
  const idcardliff: any = process.env.idcardliff;
  const [profileid, setProfileid] = useState<any>({});
  const [os, setOs] = useState<string>();
  // const [profile, setProfile] = useState<any>({});
  const [lineId, setLineId] = useState("");
  const [image, setimage] = useState("");
  const r = 6371;
  const today = new Date();

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

  // const getData = async () => {
  //   const res = await axios.get(`${pathUrl}/worker/getdataworker/${datacid}`);
  //   console.log(res.data);
  //   if (res.data.ok) {
  //     setData(res.data.message[0]);
  //     // setDistance(distance)
  //     console.log("ระยะห่าง", distance);
  //   }
  // };
  const formatDate = (date: any) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("th-TH", options);
  };

  // const getProfile = async () => {
  //   await liff.init({ liffId: idcardliff }).then(async () => {
  //     const profile: any = await liff.getProfile();
  //     // const idToken=liff.getIdToken();
  //     console.log("Profile", profile);
  //     setProfileid(profile);
  //     setLineId(profile?.userId);
  //     setLineId(profile?.userId);
  //     setimage(profile?.pictureUrl);
  //     console.warn(lineId);
  //   });
  //   await liff.ready;
  // };

  const initial = async () => {
    setLoading(true);
    const res = await axios.get(`${pathUrl}/worker/getdataworker/${datacid}`);
    console.log(res.data);
    if (res.data.ok) {
      setData(res.data.message[0]);
      await navigator.geolocation.getCurrentPosition(async (position: any) => {
        setLat1(position.coords.latitude);
        setLong1(position.coords.longitude);
        console.log("SET lat", position.coords.latitude);
        const d: number = haversine(
          res.data.message[0].organize_lat,
          res.data.message[0].organize_long,
          // 13.530873, 99.816264

          position.coords.latitude,
          position.coords.longitude
        );
        // fnlat(position.coords.latitude);
        //   fnLong(position.coords.longitude);
        console.log("ddd", position.coords.latitude);

        setDistance(d * 1000);
        console.log("datadis", distance);

        setcheckclockin(res.data.message[0].clockin);
        setcheckclockout(res.data.message[0].clockout);
        // setName( res.data.message[0].fname + " "+res.data.message[0].lname);

        console.log("checkclockin", data.checkclockin);
        // router.push("/checkin/feeling?cid=" + data.cid);
      });
    }
    setLoading(false);
    await liff.init({ liffId: idcardliff }).then(async () => {
      const profile = await liff.getProfile();
      console.log("Profile", profile);
    });
    // console.log("ProfilePageCheckin",profile);
  };

  useEffect(() => {
    initial();
    // getProfile();
    // if (lat1 == null && long1 == null) {
    //   Swal.fire({
    //     title: "WARNING!!!!!!",
    //     text: "กรุณาเปิด GPS ก่อนใช้งาน",
    //     icon: "warning",
    //     timer: 9000,
    //     showConfirmButton: false,
    //     allowOutsideClick: false,

    //     // confirmButtonText: "รับทราบ!",
    //   });
    // }

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
  }, [line, datacid, profile, fn]);

  // console.log("data cide", data.cid);
  // console.log("datadistance", distance);

  const now = new Date();
  const getEmotion = (e: any) => {
    // setMessage(e);
    setEmotion(e.target.value);

    // console.log("value is Emotion:", e.target.value);
  };
  const flippage = async () => {};
  const postData = async () => {
    const dataSend = {
      clockin: dayjs(new Date()).format("HH:mm"),
      // clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date()).format("YYYY-MM-DD"),
      worker_id: data.id,
      lat_in: lat1,
      long_in: long1,
      typework_in: 1,
    };
    console.log("datasend", dataSend);
    const res = await axios.post(`${pathUrl}/perfectdays`, dataSend);

    // console.log("res send data", res.data);

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
      initial();
      // location.reload();
      // getData();
    } else {
      throw new Error(res.data.error);
    }
  };
  // console.log("transaction", data.transaction_id);
  const upsData = async () => {
    const dataSend = {
      // clockin:dayjs(new Date).format("HH:mm") ,
      clockout: dayjs(new Date()).format("HH:mm"),
      lat_out: lat1,
      long_out: long1,
      typework_out: 1,
    };
    console.log("datasend", dataSend);

    const res_up = await axios.put(
      `${pathUrl}/perfectdays/${data.transaction_id}`,
      dataSend
    );
    console.log("res send data", res_up.data);

    if (res_up.data.ok) {
      Swal.fire({
        title: "SUCCESS!",
        text: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        allowOutsideClick: false,

        // confirmButtonText: "รับทราบ!",
      });
      // getData();
      fn(5);
    } else {
      throw new Error(res_up.data.error);
    }
  };

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
  };

  return (
    <div>
      <div className="containner  ">
        {/* <div className="text-xl font-bold">{ props.mikung.cid}</div>
        <div className="text-xl font-bold">{ props.mikung.name}</div> */}
        <div className="grid grid-cols-1 ">
          <div className=" grid grid-cols-1  justify-self-center ">
            <Image
              className="flex items-center self-start ml-1  rounded-full border-[15px] border-[#F26B22] "
              // src="/image/personal w.png"
              src={profile?.pictureUrl}
              alt={""}
              width={130}
              height={135}
            ></Image>
          </div>

          <div className=" grid grid grid-flow-row auto-rows-max justify-self-center mt-5 ">
            {/* <div className=" grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1  items-center"> */}
            <div className="textdescrip text-2xl mt-2">
              <h3>{data.fname + " " + data.lname}</h3>
            </div>

            <div className="text-dep  text-center text-gray-300 ">
              <h3>{data.position}</h3>
            </div>

            {data.clockin != null ? (
              <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1  justify-self-center ">
                <div className=" flex items-center justify-center    border-4 rounded-lg p-2  border-[#3956BF] w-[220px] h-[49px]">
                  <label className="text-center  text-[40px] text-[#3956BF] ">
                    {data?.clockin?.toString().substring(0, 5)}
                  </label>
                </div>
                {data.clockout != null ? (
                  <div className="mt -3 grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center ">
                    <div className="mt-5 flex items-center justify-center    border-4 rounded-lg p-2  border-[#2A6417] w-[220px] h-[49px]">
                      <label className="text-center  text-[40px] text-[#2A6417] ">
                        {data.clockout?.toString().substring(0, 5)}
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center ">
                    {distance < data.organize_radius ? (
                      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mt-2">
                        <Button
                          className="border-4 bg-[#056839] border-gray w-[178px] h-[58px] rounded-lg text-lg  "
                          onClick={upsData}
                        >
                          CLOCK OUT
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center ">
                        <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
                          OUT OF RANGE
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                <div className=" mb-5">
                  <div
                    className="text-[16px]  text-start
                    text-[#8F8B8B] "
                  >
                    ห่างจากสถานที่ทำงาน : {Math.round(distance)} เมตร
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                {distance < data.organize_radius ? (
                  <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center mb-6">
                    <Button
                      className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-3xl cursor-pointer"
                      onClick={postData}
                    >
                      CLOCK IN
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-1 sm:grid-cols-1 justify-self-center">
                    <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
                      OUT OF RANGE
                    </Button>
                  </div>
                )}
                <div className=" mb-2">
                  <div
                    className="text-[16px]  text-start
                    text-[#8F8B8B] "
                  >
                    ห่างจากสถานที่ทำงาน : {Math.round(distance)} เมตร
                  </div>
                </div>
              </div>
              
            )}
          </div>
        </div>

        <div className="container  pt-[100px] w-full">
          {data?.emotion != null ? (
            <div className="flex flex-col justify-center ">
              <div className="grid grid-cols-1  justify-items-center">
                {data?.emotion == 4 && (
                  <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                    <Image
                      src={`/perfectdays2/image/Group1016.png`}
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
                )}

                {data?.emotion == 3 && (
                  <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                    <Image
                      src={`/perfectdays2/image/happy.png`}
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
                )}
                {data?.emotion == 2 && (
                  <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                    <Image
                      src={`/perfectdays2/image/everage.png`}
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
                )}
                {data?.emotion == 1 && (
                  <div className="grid grid-cols1 grid-rows-2 justify-items-center cursor-pointer">
                    <Image
                      src={`/perfectdays2/image/poor.png`}
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
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-3 ">
              <div className="flex flex-row">
                <div className="justify-self-center  text-4xl">
                  {hours}:{minutes}:{seconds}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="justify-self-center  text-2xl">
                  {formatDate(today)}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkintime;
