"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { th } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, getYear } from "date-fns";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Calendar } from "primereact/calendar";
import { DatePicker, DatePickerProps, Space } from "antd";


const pathUrl: any = process.env.pathUrl;
dayjs.extend(buddhistEra);
const dataMonth: any = {
  "01": "มกราคม",
  "02": "กุมภาพันธ์",
  "03": "มีนาคม",
  "04": "เมษายน",
  "05": "พฤษภาคม",
  "06": "มิถุนายน",
  "07": "กรกฎาคม",
  "08": "สิงหาคม",
  "09": "กันยายน",
  "10": "ตุลาคม",
  "11": "พฤศจิกายน",
  "12": "ธันวาคม",
};
const yearini = 2023;
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};
function TimeLinePage() {
  const dateNow = new Date();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [datalog, setDatalog] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [emotinPerfect, setEmotinPerfect] = React.useState(0);
  const [emotinHappy, setEmotinHappy] = React.useState(0);
  const [emotinEverage, setEmotinEverage] = React.useState(0);
  const [emotinPoor, setEmotinPoor] = React.useState(0);
  const [dataYear, setDataYear] = React.useState<any>([]);
  console.log(datalog);
  const pathUrl: any = process.env.pathUrl;
  const searchParams = useSearchParams();
  const lineid = searchParams.get("lineid");
  const monthFormat = "MMMM YYYY";

  const getData = async () => {
    const res = await axios.get(
      `${pathUrl}/perfectdays/profile/03/2024/${lineid}`
    );
    console.log("res", res.data);
    setDatalog(res.data.message);
    const perfect = res.data.message.filter((v: any) => {
      if (v.emotion == 4) {
        return v;
      }
    });
    const happy = res.data.message.filter((v: any) => {
      if (v.emotion == 3) {
        return v;
      }
    });
    const everage = res.data.message.filter((v: any) => {
      if (v.emotion == 2) {
        return v;
      }
    });
    const poor = res.data.message.filter((v: any) => {
      if (v.emotion == 1) {
        return v;
      }
    });
    console.log("happy", happy);
    setEmotinPerfect(perfect.length);
    setEmotinHappy(happy.length);
    setEmotinEverage(everage.length);
    setEmotinPoor(poor.length);
    console.log("datalog: " + datalog);
  };
  useEffect(() => {
    const yy: any = [];
    for (let i = yearini; i <= dayjs().year(); i++){
      const getyear: any = {};
      getyear.value = i;
      getyear.label = i + 543;
      yy.push(getYear);
    }
    console.log(yy);
    setDataYear(yy);
    getData();
  }, []);

  console.log(dayjs().month());
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
                  "w-full justify-center text-center font-[22px]",
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
              {/* <Calendar
                // month={date}
                mode="single"
                locale={th}
                // captionLayout="dropdown-buttons"
                selected={date}
                onSelect={setDate}
                initialFocus
                fromYear={2024}
                toYear={2040}
                // month={new Date().getMonth()}
              /> */}
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
        {/* <div className="grid grid-cols-1 mt-3 justify-center">
          {" "}
          <DatePicker
            defaultValue={dayjs(date).add(543, "year").monthFormat()}
            onChange={onChange}
            picker="month"
          />
        </div> */}
        <div className="row mt-5 w-full">
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
              {/* {datalog.map((v: any, index: any) => (
                <Label key={v.transaction_id}>{v.emotion == 3}</Label>
              ))} */}
              <label className="text-[18px] font-bold text-black text-center ">
                {emotinPerfect}
              </label>
            </div>
            <div className="grid grid-cols-1 ">
              <label className="text-[18px] font-bold text-black text-center ">
                {emotinHappy}
              </label>
            </div>
            <div className="grid grid-cols-1 ">
              <label className="text-[18px] font-bold text-black text-center ">
                {emotinEverage}
              </label>
            </div>
            <div className="grid grid-cols-1 ">
              <label className="text-[18px] font-bold text-black text-center ">
                {emotinPoor}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E7F5FF] w-full mt-3 pb-3">
        <div className="container">
          <div className="flex flex-col">
            <div className="flex flex-row items-center py-3 justify-center">
              <div className="text-[18px] font-bold text-black  basis-1/3 text-center">
                วันที่
              </div>
              <div className="basis-1/3 items-center text-center justify-center align-middle">
                <div className="flex flex-row justify-center">
                  <Image
                    className=""
                    src="/perfectdays2/image/morning.png"
                    alt=""
                    width={29}
                    height={22}
                    // onClick={updateGPS}
                  ></Image>
                </div>
              </div>
              <div className="basis-1/3">
                <div className="flex flex-row justify-center">
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
            {datalog.map((v: any, index: any) => {
              return (
                <div className="flex flex-row items-center mt-1" key={index}>
                  <div className="  text-black  basis-1/3 text-center">
                    {dayjs(v.work_date)
                      .locale("th")
                      .add(543, "years")
                      .format("DD-MM-YYYY")}
                  </div>
                  <div className="basis-1/3">
                    <div className="flex flex-row justify-center">
                      {v.clockin.toString().substring(0, 5)}
                    </div>
                  </div>
                  <div className="basis-1/3">
                    <div className="flex flex-row justify-center">
                      {v.clockout ? v.clockout.toString().substring(0, 5) : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div className="bg-[#E7F5FF] w-full">
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
          <div className="grid grid-cols-1 justify-items-start "></div>
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
      </div> */}
    </div>
  );
}

export default TimeLinePage;
