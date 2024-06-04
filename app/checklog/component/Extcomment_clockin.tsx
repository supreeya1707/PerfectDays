import { Button } from "@/components/ui/button";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
const Extcomment = ({ line, datacid, profile,fn }: dataProps) => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const pathUrl: any = process.env.pathUrl;

  const [date, setDate] = useState("date");
  const [data, setData] = useState<any>({});
    const [lat1, setLat1] = useState<any>({});
  const [long1, setLong1] = useState<any>({});
  const [distance, setDistance] = useState<any>();
   const [loading, setLoading] = useState(true);
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
  //     // console.log("ระยะห่าง", distance);
  //   }
  // };
   const initial = async () => {
     setLoading(true);
     const res = await axios.get(`${pathUrl}/worker/getdataworker/${datacid}`);
     console.log(res.data);
     if (res.data.ok) {
       await navigator.geolocation.getCurrentPosition(async (position: any) => {
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
         console.log("ddd", d);
         setDistance(d * 1000);
         console.log("datadis", distance)
         setData(res.data.message[0]);
         
         // setName( res.data.message[0].fname + " "+res.data.message[0].lname);

         console.log("checkclockin", data.checkclockin);
         // router.push("/checkin/feeling?cid=" + data.cid);
       });
     }
     setLoading(false);
     // await liff.init({ liffId: idcardliff }).then(async () => {
     //   const profile = await liff.getProfile();
     //   console.log("Profile", profile);
     // });
   };
  useEffect(() => {
    // getData();
      initial();
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
  const postDatalearn = async () => {
      const dataSend = {
      clockin: dayjs(new Date()).format("HH:mm"),
      // clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date()).format("YYYY-MM-DD"),
      worker_id: data.id,
      lat_in: lat1,
      long_in: long1,
      typework_in: 2,
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
      fn(1);
      // location.reload();
      // getData();
    } else {
      throw new Error(res.data.error);
    }
  };
  const postDataWFH= async () => {
      const dataSend = {
      clockin: dayjs(new Date()).format("HH:mm"),
      // clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date()).format("YYYY-MM-DD"),
      worker_id: data.id,
      lat_in: lat1,
      long_in: long1,
      typework_in: 3,
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
      fn(1);
      // location.reload();
      // getData();
    } else {
      throw new Error(res.data.error);
    }
  };
  const postDataOUT= async () => {
      const dataSend = {
      clockin: dayjs(new Date()).format("HH:mm"),
      // clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date()).format("YYYY-MM-DD"),
      worker_id: data.id,
      lat_in: lat1,
      long_in: long1,
      typework_in: 4,
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
      fn(1);
      // location.reload();
      // getData();
    } else {
      throw new Error(res.data.error);
    }
  };
  
  return (
    <div>
      <div className="container mb-20">
        <div className="flex flex-col  items-center gap-2  ">
          <div className="justify-items-center">
            <Button
              onClick={postDatalearn}
              className="border-4 bg-[#E97132] border-gray w-[228px] h-[56px] text-[24px] cursor-pointer shadow-lg rounded-lg "
            >
              อบรมนอกสถานที่
            </Button>
          </div>
          <div className="justify-items-center">
            <Button
              onClick={postDataWFH}
              className="border-4 bg-[#E97132] border-gray w-[228px] h-[56px] text-[24px] cursor-pointer shadow-lg rounded-lg "
            >
              Work From Home
            </Button>
          </div>
          <div className="justify-items-center ">
            <Button
              onClick={postDataOUT}
              className="border-4 bg-[#8C123E] border-gray w-[228px] h-[56px] text-[16px] cursor-pointer shadow-lg rounded-lg  "
            >
              ออกนอกสถานที่มาแล้ว
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extcomment;
