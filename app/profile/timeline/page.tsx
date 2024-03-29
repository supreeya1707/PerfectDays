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
import buddhistEra from "dayjs/plugin/buddhistEra";
import { th } from "date-fns/locale";
import { Button } from '@/components/ui/button';
import { CalendarIcon, PieChart } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { Chart } from "chart.js";


dayjs.extend(buddhistEra);
function TimeLinePage() {
  const dateNow = new Date();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["ตรงเวลา", "มาสาย"],
            datasets: [{
                data: [70, 10],
                borderColor: [
                    "#F5F5F5",
                    "#F5F5F5",
                    
                ],
                backgroundColor: [
                    "#3B7D23",
                    "#E97132",
                    
                ],
                borderWidth: 2,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false,
                }],
            }
        },
    });
}, [])
 
  return (
    <div className="">
      <div className="container">

      <div className="w-[1100px] h-screen flex mx-auto my-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        <div> <PieChart/></div>
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
            <label className="text-[18px] font-bold text-black text-center ">
              32
            </label>
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
      
     
      <div className='bg-[#E7F5FF] w-full'>

<div className=" container row mt-3 ">
        <div className="grid grid-cols-3">
          <div className="grid grid-cols-1 ">
            <label className="text-[18px] font-bold text-black text-start ">
              วันที่
            </label>
          </div>

          <div className="grid grid-cols-1 ">
            <Image
              className="justify-end"
              src="/perfectdays2/image/morning.png"
              alt=""
              width={29}
              height={22}
              // onClick={updateGPS}
            ></Image>
          </div>
          <div className="grid grid-cols-1 ">
            <Image
              className="justify-end"
              src="/perfectdays2/image/evening.png"
              alt=""
              width={29}
              height={22}
              // onClick={updateGPS}
            ></Image>
          </div>
          </div><div className="grid grid-flow-row auto-rows-max">
            
        </div>
      </div>
      </div>
      
      

      {/* <Card className="bg-[#E7F5FF] mt-5">
        <div className="grid grid-cols-3 ">
          <CardHeader>
            <CardTitle className="text-[#427486]">วันที่</CardTitle>
            <label className="">01 มีนาคม 2567</label>
            <CardDescription>C</CardDescription>
          </CardHeader>
          <CardHeader>
            <Image
              className="justify-center"
              src="/perfectdays2/image/morning.png"
              alt=""
              width={29}
              height={22}
              // onClick={updateGPS}
            ></Image>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardHeader>
            <Image
              className="justify-center"
              src="/perfectdays2/image/morning.png"
              alt=""
              width={29}
              height={22}
              // onClick={updateGPS}
            ></Image>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </div>

        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card> */}
    </div>
  );
}

export default TimeLinePage;