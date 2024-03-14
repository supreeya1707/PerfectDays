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
const LoginFormSchema = z.object({
  username: z.string({ required_error: "กรุณาใส่ Username" }),
  password: z.string({ required_error: "กรุณาใส่ Password" }),
});

function page() {
      type LoginFormValues = z.infer<typeof LoginFormSchema>;
 const pathUrl: any = process.env.pathUrl;
  const searchParams = useSearchParams();
  const lineid = searchParams.get("lineid");

// form
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // Submit
  const onSubmit=async (data: LoginFormValues) =>{
    console.log("data", data);
    const res = await axios.post(`${pathUrl}/worker/checklogin`, {
      username: data.username,
      password: data.password,
    });
    console.log("res login : ", res.data);
    if (res.data.ok) {
      
    }
  }


  return (
    <div className="containner  ">
      <div className=" grid grid grid-flow-row auto-rows-max justify-self-center content-start">
        <Image
          className="flex justify-items-center self-start "
          src="/image/PerfectDay_head 1.png"
          alt={""}
          width={390}
          height={214}
        ></Image>
      </div>
      {lineid}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className=" bgblue grid grid grid-flow-row auto-rows-max justify-self-center content-start  ">
            <div className="mt-5 w-[239px]  h-[41px]  ">
              <Input type="username" placeholder="username" />
            </div>
            <div className="mt-5 w-[239px]  h-[41px] grid grid-cols-auto  justify-self-center ">
              <Input type="password" placeholder="password " />
            </div>
            <div className="mt-5 w-[175px]  h-[41px] grid grid-cols-auto  justify-self-center ">
              <Button className="border-2 bg-[#F26B22] border-white">
                Login
              </Button>
            </div>
          </div> */}
        </form>
      </Form>
    </div>
  );
}

export default page;


