"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
// import Clock from "./clock";
// import Clock from "react-live-clock";
import liff from "@line/liff"
import axios from "axios";

function page() {
  const [loading,setloading]=useState("");
  
  useEffect(() => {

    const initLiff = async () => {
      setloading(false);
      await liff.init({ liffId: lineliffid }).then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const profile = await liff.getProfile()
          console.log(profile);
          setProfile(profile)
          setLineId(profile?.userId);
          setloading(true);
          console.warn(lineId);
          form.reset({
            username: '',
            password: '',
            line_id: profile?.userId
          });

          const checkLineId = await axios.get(`https://hyggemedicalservice.com/apirbh/rbh-line-numalee/lineid/${profile.userId}`);
          if (checkLineId.data.length > 0) {
            setCheckuser(true);
            setUser(checkLineId.data[0]);
          } else {
            setCheckuser(false);
          }
        }
      });
      await liff.ready
    }

    try {
      initLiff()
    } catch (e: any) {
      console.error('liff init error', e.message)
    }

  }, [lineId])
  return (
    <div className="containner ">
      <h1>TSERT</h1>
    </div>
  );
}

export default page;
