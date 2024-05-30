import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Swal from "sweetalert2";
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
const Overtime = ({ line, datacid, profile }: dataProps) => {
  const pathUrl: any = process.env.pathUrl;
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
   const [lat1, setLat1] = useState<any>({});
  const [long1, setLong1] = useState<any>({});
  const [distance, setDistance] = useState<any>();
  const [checkclockin, setcheckclockin] = useState<any>({});
  const [checkclockout, setcheckclockout] = useState<any>({});
  const searchParams = useSearchParams();
  const cid = searchParams.get("datacid");
  const getData = async () => {
    const res = await axios.get(`${pathUrl}/worker/getdataworker/${datacid}`);
    console.log("res.data",res.data);
    if (res.data.ok) {
      setData(res.data.message[0]);
      // setDistance(distance)
      // console.log("ระยะห่าง", distance);
    }
  };
 useEffect(() => {
   getData();
 }, []);
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
         console.log("datadis", distance);
         setData(res.data.message[0]);
         setcheckclockin(res.data.message[0].clockin);
         setcheckclockout(res.data.message[0].clockout);
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
  const postData = async () => {
    const dataSend = {
      ot_clockin: dayjs(new Date()).format("HH:mm"),
      // clockout:dayjs(new Date).format("HH:mm"),
      work_date: dayjs(new Date()).format("YYYY-MM-DD"),
      worker_id: data.id,
      ot_lat_in: lat1,
      ot_long_in: long1,
      typework: 1,
    };
    console.log("datasend", dataSend);
    const res = await axios.post(`${pathUrl}/perfectdaysot`, dataSend);

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
      console.log("res overtime: ", res.data);
      initial();
      // location.reload();
      // getData();
    } else {
      throw new Error(res.data.error);
    }
  };
  return (
    <div>
      <div className="containner mt-10 pt-10">
        {/* <div className="bg-local  bgImgback grid grid-cols-1"> */}

        <div className="flex flex-col items-center gap-4 ">
          <div className="  justify-items-center">
            <label className=" text-3xl   text-[#3956BF] ">OVERTIME</label>
          </div>
          {data.clockin != null && data.clockout != null ? (
            <div className="mt-1">
              <Button className="border-4 bg-[#3956BF] border-gray w-[178px] h-[58px] text-xl cursor-pointer" onClick={postData}>
                CLOCK IN
              </Button>
            </div>
          ) : (
            <div className="  justify-items-center">
              <label className=" text-3xl   text-[#FF5733] ">
                กรุณากด clockout ก่อน!
              </label>
            </div>
          )}

          {/* <div>
            <Button className="border-4 bg-[#056839] border-gray w-[178px] h-[58px] rounded-lg text-3xl  ">
              CLOCK OUT
            </Button>
          </div>
          <div>
            <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
              OUT OF RANGE
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Overtime;
