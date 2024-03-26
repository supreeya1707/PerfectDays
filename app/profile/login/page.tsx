"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { setInterval } from "timers";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import Clock from "./clock";
// import Clock from "react-live-clock";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import liff from "@line/liff";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const LoginFormSchema = z.object({
  cid: z.string({ required_error: "กรุณาใส่ Username" }),
  passcode: z.string({ required_error: "กรุณาใส่ Password" }),
});

function LoginPage() {
  const router = useRouter();
  type LoginFormValues = z.infer<typeof LoginFormSchema>;
  const pathUrl: any = process.env.pathUrl;
  const searchParams = useSearchParams();
  const lineid = searchParams.get("lineid");
  const [profile, setProfile] = useState<any>({});

  const [lineId, setLineId] = useState("");
  // form
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      cid: "",
      passcode: "",
    },
  });
  // Submit
  const onSubmit = async (data: LoginFormValues) => {
    console.log("data", data);
    const res = await axios.post(`${pathUrl}/worker/checklogin`, {
      // cid:"1329900007811",
      lineid: lineid,
      cid: data.cid,
      passcode: data.passcode,
      // lineid:lineid
    });
    console.log("res login : ", res.data);
    if (res.data.ok) {
      console.log("resOK", res.data.message);
      if (res.data.message.cid) {
        // const profile = await liff.getProfile();
        // console.log('profile', profile);
        // setProfile(profile);
        // setLineId(profile?.userId);
        // console.warn(lineId);
        // const dataSend = {
        //   token_line: `${profile.userId}`,
        // };
        router.push("/checkin/perfectdays?cid=" + res.data.message.cid);
      } else {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          showConfirmButton: false,
          showCloseButton: true,
          html: "Username หรือ Password ไม่ถูกต้อง<br>" + "กรุณาลองอีกครั้ง",
        }).then(() => {
          form.reset();
        });
      }
    } else {
      throw new Error(res.data.error);
    }
  };

  return (
    <div className="containner  ">
      <div className=" grid grid grid-flow-row auto-rows-max justify-self-center content-start">
        <Image
          className="flex justify-items-center self-start "
          src="/perfectdays2/image/PerfectDay_head 1.png"
          alt={""}
          width={390}
          height={214}
        ></Image>
      </div>
      {/* {lineid} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="pt-10 bgblue grid grid grid-flow-row auto-rows-max justify-self-center content-start  ">
            <FormField
              control={form.control}
              name="cid"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>เลขบัตรประจำตัวประชาชน</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="เลขบัตรประชาชน"
                      maxLength={13}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passcode"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col space-y-1.5 mt-5 ">
                    <FormControl>
                      <Input placeholder="passcode" maxLength={6} {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
