"use client"
import React, { useEffect } from 'react'
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import dayjs from 'dayjs';
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { th } from "date-fns/locale";
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
const pathUrl: any = process.env.pathUrl;
dayjs.extend(buddhistEra);
function TimeLinePage() {
  const dateNow = new Date();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [datalog, setDatalog] = React.useState([]);
  const [count, setCount] = React.useState([]);
  console.log("datalog: " + datalog);
  const getData = async () => { 
    const res = await axios.get(
      `https://mi8889.hyggecode.com/hyggemain/perfectdays/perfectdays/profile/03/2024/Uca0a129246460a447d31ec5f03610630`
    );
    console.log('res', res.data);
    setDatalog(res.data.message[0])

    console.log("datalog: " +datalog);
  }
  useEffect(() => { 
    getData();
   
    
  },[]); 

 
  return (
    <div className="">
      <div className=" grid grid grid-flow-row auto-rows-max justify-self-center content-start">
        <Image
          className="flex justify-items-center self-start "
          src="/perfectdays2/image/head.png"
          alt={""}
          width={390}
          height={214}
        ></Image>
      </div>
      <div className="container">
        <div className=" grid grid-cols-1 mt-3 justify-center">
          {/* <Input  className="justify-center text-[20px]"type="month" name='month'>

        </Input> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-center text-center font-[20px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "MMMM ", { locale: th })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                locale={th}
                selected={date}
                onSelect={setDate}
                initialFocus
                // month={new Date().getMonth()}
              />
            </PopoverContent>
          </Popover>

          {/* <Input
                  className=" justify-center text-[20px] text-[#417988]"
                  type="month"
                  
                  value={dayjs(date)
                    // .add(543, "year")
                    // .locale("th")
                    .format(" MMMM ")
                  }
                /> */}
        </div>

        <div className="row mt-5">
          <div className="grid grid-cols-4">
            <div className="grid grid-cols-1 grid-row-2">
              <Image
                src="/perfectdays2/image/Group1016.png"
                alt={""}
                width={68}
                height={65}
              ></Image>
              <label
                className="text-[12px] font-bold text-[#0093D2] text-center "
                id="Perfect"
                htmlFor="Perfect"
              >
                Perfect Day
              </label>
            </div>
            <div className="grid grid-cols-1 grid-row-2">
              <Image
                src="/perfectdays2/image/happy.png"
                alt={""}
                width={68}
                height={65}
              ></Image>
              <label
                className="text-[12px] font-bold text-[#D43A7B] text-center "
                id="happy"
                htmlFor="happy"
              >
                happy
              </label>
            </div>
            <div className="grid grid-cols-1 grid-row-2">
              <Image
                src="/perfectdays2/image/everage.png"
                alt={""}
                width={68}
                height={65}
              ></Image>
              <label
                className="text-[12px] font-bold text-[#389F2F] text-center "
                id="everage"
                htmlFor="everage"
              >
                everage
              </label>
            </div>
            <div className="grid grid-cols-1 grid-row-3">
              <Image
                src="/perfectdays2/image/poor.png"
                alt={""}
                width={68}
                height={65}
              ></Image>
              <label
                className="text-[12px] font-bold text-[#764416] text-center  "
                id="poor"
                htmlFor="poor"
              >
                poor
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="grid grid-cols-4">
            <div className="grid grid-cols-1 ">
              {datalog.map((v: any, index: any) => (
                <Label key={v.transaction_id}>
                  {v.emotion == 3 }
                </Label>
              ))}
              {/* <label className="text-[18px] font-bold text-black text-center ">
                32
              </label> */}
            </div>
            <div className="grid grid-cols-1 ">
              <label className="text-[18px] font-bold text-black text-center ">
                19
              </label>
            </div>
            <div className="grid grid-cols-1 ">
              <label className="text-[18px] font-bold text-black text-center ">
                7
              </label>
            </div>
            <div className="grid grid-cols-1 ">
              <label className="text-[18px] font-bold text-black text-center ">
                1
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E7F5FF] w-full">
        <div className=" container row mt-3 ">
          <div className="grid grid-cols-3  justify-around">
            <div className="grid grid-cols-1  mt-10 justify-items-start">
              <label className="text-[18px] font-bold text-black text-start ">
                วันที่
              </label>
            </div>

            <div className="grid grid-cols-1 mt-10 justify-items-center">
              <Image
                className="justify-end"
                src="/perfectdays2/image/morning.png"
                alt=""
                width={29}
                height={22}
                // onClick={updateGPS}
              ></Image>
            </div>
            <div className="grid grid-cols-1 mt-10  justify-items-center">
              <Image
                className=""
                src="/perfectdays2/image/evening.png"
                alt=""
                width={29}
                height={22}
                // onClick={updateGPS}
              ></Image>
            </div>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-3 px-3 mt-5 justify-around">
          <div className="grid grid-cols-1 justify-items-start ">
            {datalog.map((v: any, index: any) => (
              <Label key={v.transaction_id}>
                {dayjs(v.work_date)
                  .locale("th")
                  .add(543, "years")
                  .format("DD-MM-YYYY")}
              </Label>
            ))}
          </div>
          <div className="grid grid-cols-1  justify-items-center">
            {datalog.map((v: any) => (
              <Label key={v.transaction_id}>
                {v.clockin.toString().substring(0, 5)}
              </Label>
            ))}
          </div>
          <div className="grid grid-cols-1 justify-items-center">
            {datalog.map((v: any) => (
              <Label key={v.transaction_id}>{v.clockout}</Label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLinePage;