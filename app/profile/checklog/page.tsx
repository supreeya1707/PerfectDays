'use client'
import React, { useEffect, useState } from 'react'
import liff from "@line/liff";
import GetOS from "@line/liff/get-os";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { InfinitySpin } from 'react-loader-spinner';
function ChecklogPage() {
    const router = useRouter(); 
    const pathUrl: any = process.env.pathUrl;
    const idcardliff: any = process.env.idcardliff;

    const [os, setOs] = useState<string>();
    
    const [profile, setProfile] = useState<any>({});
    const [lineId, setLineId] = useState("");
    const [User, setUser] = useState("");
     const [loading, setLoading] = useState(true);
     const [checkUser, setCheckuser] = useState(true);
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
               `${pathUrl}/worker/checkline/${profile.userId }`
             );
             console.info(checkLineId.data);
             console.log("res2", checkLineId.data);
             console.log('checkLineId', checkLineId)
               if (checkLineId.data.message.length > 0) {
                 const stafftype = checkLineId.data.message[0];
                   setCheckuser(true);
                   setUser(checkLineId.data[0]);
                   //    rout to page checkin...
                  router.replace(
                    "/profile/login?cid=" + checkLineId.data.message[0].cid
                  );
                //  console.log("check CID", checkLineId.data.message[0].cid);
                   
               } else {
                  //  router.push("/checkin/login?lineid="+profile.userId);
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

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center w-full mt-20">
          <InfinitySpin
           
            width="200"
            color="#4fa94d"
            
          />
        </div>
      )}
    </div>
  );
}

export default ChecklogPage;