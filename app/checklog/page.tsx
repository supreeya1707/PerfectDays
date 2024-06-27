"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import liff from "@line/liff";
import GetOS from "@line/liff/get-os";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { InfinitySpin } from "react-loader-spinner";
import { usePatientStore } from "../store";
import Menuextclock from "./component/Menuextclock";
import Checkintime from "./component/checkintime";
import Overtime from "./component/overtime";
import Extcomment from "./component/Extcomment";
import Extcomment_clockin from "./component/Extcomment_clockin";
import MenuEmotion from "./component/MenuEmotion";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
function ChecklogPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [emotion, setemotion] = useState(0);
  const pathUrl: any = process.env.pathUrl;
  // const idcardliff: any = process.env.lifftest;
  const idcardliff: any = process.env.idcardliff;


  const [os, setOs] = useState<string>();

  const [profile, setProfile] = useState<any>({});
  const [lineId, setLineId] = useState("");
  const [cid, setCid] = useState("");
  const [User, setUser] = useState("");
  const [lat, setLat] = useState("");
  const [long, setlong] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkUser, setCheckuser] = useState(true);
  const [data, setData] = useState<any>({});
  const [dataworker, setDataworker] = useState<any>({});
  const updatePatient: any = usePatientStore(
    (state: any) => state.updatePatient
  );

  const fnSetStep = (e: any) => {
    setStep(e);
    console.log("step", e);
  };
  const fnSetEmotion = (e: any) => {
    setemotion(e);
    console.log("emotion", e);
  };
  const fnlat = (e: any) => {
    setLat(e);
    console.log("emotion", e);
  };
  const fnLong = (e: any) => {
    setlong(e);
    console.log("emotion", e);
  };

   useEffect(() => {
     const initLiff = async () => {
       liff.use(new GetOS());
       setOs(liff.getOS());
       await liff.init({ liffId: idcardliff }).then(async () => {
         if (!liff.isLoggedIn()) {
           liff.login();
         } else {
           const profile = await liff.getProfile();

           // console.log(profile);
           // console.log("profile?.userId", profile?.userId);
           setProfile(profile);
           setLineId(profile?.userId);

           console.warn(lineId);

           const dataSend = {
             token_line: `${profile.userId}`,
           };

           const checkLineId = await axios.get(
             `${pathUrl}/worker/checkline/${profile.userId}`
           );
           console.info(checkLineId.data);
           console.log("res2", checkLineId.data.message[0].cid);
           console.log("checkLineId", checkLineId);
            const getworker = await axios.get(
              `${pathUrl}/worker/getdataworker/${checkLineId.data.message[0].cid}`
            );
           console.log("getWorker", getworker.data.message[0].cid);
           setDataworker(getworker.data.message[0]);
           console.log("SETDATA", getworker.data.message[0].emotion);
          //  if (dataworker.clockin != null && dataworker.clockout != null) {
             setStep(5)
          
           if (checkLineId.data.message.length > 0) {
             setLoading(false);
             const stafftype = checkLineId.data.message[0];
             setCheckuser(true);
            //  setUser(checkLineId.data[0]);
            //  updatePatient(checkLineId.data.message[0]);
             console.log("userPatient", updatePatient);
             setCid(checkLineId.data.message[0].cid);
             console.log("DATAWorker", dataworker.clockin)
            //  if (dataworker.clockin != null && dataworker.clockout != null) {
               if (
                 getworker.data.message[0]?.emotion == null &&
                 getworker.data.message[0]?.clockout != null &&
                 getworker.data.message[0].clockin != null
               ) {
                 setStep(5);
               } else {
                 setStep(1);
               }
             
             
           } else {
             router.push("/checkin/login?lineid=" + profile.userId);
             setCheckuser(false);
           }
         }
       });
       await liff.ready;
     };

     try {
       initLiff();
     } catch (e: any) {
       console.error("liff init error", e.message);
     }
   }, [lineId]);

  console.log("dataworker", dataworker.emotion);
  

  // if (useData.isFetching) {
  //   // setLoading(true);
  //   console.log("isfetching");
  // }

  // if (useData.isSuccess) {
  //   setLoading(false);
  //   console.log("useData.data");
  //   console.log(useData.data);
  // }
 

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center w-full mt-20">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
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

              {/* {data.emotion != null ? setStep(5)} */}
              {step === 1 && (
                <Checkintime
                  line={lineId}
                  datacid={cid}
                  profile={profile}
                  fn={fnSetStep}
                />
              )}
              {step === 2 && (
                <Menuextclock
                  line={lineId}
                  datacid={cid}
                  profile={profile}
                  fn={fnSetStep}
                />
              )}
              {step === 3 && (
                <Extcomment
                  line={lineId}
                  datacid={cid}
                  profile={profile}
                  fn={fnSetStep}
                />
              )}
              {step === 4 && (
                <Overtime
                  line={lineId}
                  datacid={cid}
                  profile={profile}
                  fn={fnSetStep}
                />
              )}

              {step === 5 && (
                <MenuEmotion
                  line={lineId}
                  datacid={cid}
                  profile={profile}
                  fn={fnSetStep}
                  emo={fnSetEmotion}
                />
              )}
              {step === 6 && (
                <Extcomment_clockin
                  line={lineId}
                  datacid={cid}
                  profile={profile}
                  fn={fnSetStep}
                />
              )}
              {/* {step === 3 && } */}
              {/* ปุ่ม flip เพื่อพลิกด้านหลัง */}
              <div className="absolute  -bottom-2 right-3 ">
                <Image
                  className="mt-2 cursor-pointer"
                  onClick={() => {
                    if (step === 2) {
                      setStep(1);
                    } else {
                      setStep(2);
                    }
                  }}
                  // src="/image/personal w.png"
                  src="/perfectdays2/image/repeat.png"
                  alt={""}
                  width={58}
                  height={58}
                ></Image>
              </div>
            </div>
          </div>
          {/* Show time and buttom refresh  gps now */}
          <div className="  pt-[620px] w-full">
            <div className="flex flex-col items-center">
              <div className="flex flex-row">
                <div className="justify-self-center  text-4xl">
                  {/* {hours}:{minutes}:{seconds} */}
                </div>
              </div>

              <div className="flex flex-col items-center mt-5">
                <div className="flex flex-row">
                  {/* <Button className="bg-[#30485E] text-[16px] w-[321px]  ">
                    UPDATE พิกัดอีกครั้ง
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChecklogPage;
