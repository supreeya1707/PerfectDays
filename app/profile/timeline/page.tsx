"use client";
import React, { useEffect, useState } from "react";
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
import { CalendarIcon, Divide } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, getDate, getYear } from "date-fns";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Calendar } from "primereact/calendar";
import { ConfigProvider, DatePicker, DatePickerProps, Space } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import thai from "antd/es/date-picker/locale/th_TH";
import thaiTh from "antd/es/locale/th_TH";
import { ThemeProvider, createMuiTheme } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { createTheme } from "@mui/material/styles";
import { Kanit } from "next/font/google";
import { fontFamily } from "@mui/system";
// import { DefaultizedPieValueType } from "@mui/x-charts";
// dayjs.extend(customParseFormat);


const inter = Kanit({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

const pathUrl: any = process.env.pathUrl;
dayjs.extend(buddhistEra);

const yearini = 2023;
const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

const buddhistLocale: typeof thai = {
  ...thai,
  lang: {
    ...thai.lang,
    fieldDateFormat: "BBBB-MM-DD",
    fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
    yearFormat: "BBBB",
    cellYearFormat: "BBBB",
  },
};
const globalBuddhistLocale: typeof thaiTh = {
  ...thaiTh,
  DatePicker: {
    ...thaiTh.DatePicker!,
    lang: buddhistLocale.lang,
  },
};

const sizing = {
  margin: { right: 0 },
  width: 180,
  height: 180,
  legend: { hidden: true },
};

// const getArcLabel = (params: DefaultizedPieValueType) => {
//   const percent = params.value / TOTAL;
//   return `${(percent * 100).toFixed(0)}%`;
// };

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
  const [dateInput, setdateInput] = React.useState<any>(dayjs());
  const [dataDate, setDatadate] = useState(new Date());
  const [year, setyear] = React.useState<any>(dayjs().year());
  const [month, setmonth] = React.useState<any>(dayjs().month() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [summarize, setsummarize] = React.useState([]);
  const [dataAllTime, setdataAllTime] = React.useState<any>(0);
  const [dataOnTime, setdataOnTime] = React.useState<any>(0);
  const [dataLateTime, setdataLateTime] = React.useState<any>(0);
  console.log(datalog);
  const pathUrl: any = process.env.pathUrl;
  const searchParams = useSearchParams();
  const lineid = searchParams.get("lineid");
  const monthFormat = "MMMM BBBB";
  const getdataLateTime = async () => {
    const restime = await axios.get(
      `${pathUrl}/worker/checkdepartment/${lineid}`

    );
    console.log(restime);
  }
  const getData = async () => {
    setLoading(true);
    const res = await axios.get(
      `${pathUrl}/perfectdays/profile/${month}/${year}/${lineid}`
    );

    console.log("res", res);
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

    const lateTime = res.data.message.filter((v: any) => {
      if (v.clockin > "08:20") {
        return v;
      }
    }).length;

    const onTime = res.data.message.filter((v: any) => {
      if (v.clockin <= "08:20") {
        return v;
      }
    }).length;

    const allTime = res.data.message.length;
    setdataAllTime(allTime);
    setdataLateTime(lateTime);
    setdataOnTime(onTime);
    console.log("happy", happy);
    setEmotinPerfect(perfect.length);
    setEmotinHappy(happy.length);
    setEmotinEverage(everage.length);
    setEmotinPoor(poor.length);
    console.log("datalog: " + datalog);
    setLoading(false);
  };

  const getData2 = async (dmonth: any, dyear: any) => {
    setLoading(true);
    const res = await axios.get(
      `${pathUrl}/perfectdays/profile/${dmonth}/${dyear}/${lineid}`
    );

    console.log("res", res);
    setDatalog(res.data.message);
    //check emotion when user click
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

    const lateTime = res.data.message.filter((v: any) => {
      if (v.clockin > "09:00") {
        return v;
      }
    }).length;

    const onTime = res.data.message.filter((v: any) => {
      if (v.clockin <= "09:00") {
        return v;
      }
    }).length;

    const allTime = res.data.message.length;
    setdataAllTime(allTime);
    setdataLateTime(lateTime);
    setdataOnTime(onTime);
    console.log("lateTime", lateTime);
    console.log("onTime", onTime);
    console.log("allTime", allTime);
    console.log("happy", happy);
    setEmotinPerfect(perfect.length);
    setEmotinHappy(happy.length);
    setEmotinEverage(everage.length);
    setEmotinPoor(poor.length);
    console.log("datalog: " + datalog);
    setLoading(false);
  };

  useEffect(() => {
    const yy: any = [];
    for (let i = yearini; i <= dayjs().year(); i++) {
      const getyear: any = {};
      getyear.value = i;
      getyear.label = i + 543;
      yy.push(getYear);
    }
    console.log(yy);
    setDataYear(yy);

    getData();
  }, []);

  //chang value in calendar
  const onChange: DatePickerProps["onChange"] = async (date, dateString) => {
    await setdateInput(date);
    await setyear(dayjs(date).year());
    await setmonth(dayjs(date).month() + 1);
    console.log("date", dayjs(date).format("MM").toString());
    console.log("1", dayjs(date).month() + 1);
    console.log("dateString", dateString);
    await getData2(dayjs(date).month() + 1, dayjs(date).year());
  };

  console.log("DateNow", dateInput);
  console.log("year", year);
  console.log("month", month);
  const theme = createTheme({
    typography: {
      fontFamily: ["Kanit"].join(","),
    },
  });
 
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
        <div className=" flex flex-col mt-3">
          <ConfigProvider
            locale={globalBuddhistLocale}
            theme={{
              token: {
                fontFamily: "${inter.className}",
                fontSize: 18,
                colorPrimary: "#417988",
                controlHeight: 38,
              },
            }}
          >
            <DatePicker
              className={`border-[#417988] ${inter.className}`}
              defaultValue={dateInput}
              value={dateInput}
              format={monthFormat}
              locale={buddhistLocale}
              onChange={onChange}
              picker="month"
            />
          </ConfigProvider>
        </div>
        <div className="flex flex-col mt-3">
          <div className="flex flex-row justify-around items-stretch">
            <div className="basis-4/6  justify-center">
              <ThemeProvider theme={theme}>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          value:
                            dataOnTime === null
                              ? 0
                              : Number(
                                  ((dataOnTime / dataAllTime) * 100).toFixed(2)
                                ),
                          // label: "ตรงเวลา",
                        },
                        {
                          value:
                            dataLateTime === null
                              ? 0
                              : Number(
                                  ((dataLateTime / dataAllTime) * 100).toFixed(
                                    2
                                  )
                                ),
                          // label: "มาสาย",
                        },
                      ],
                      arcLabel: (item) => `${item.value} %`,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontSize: 14,
                    },
                  }}
                  colors={["#3B7D23", "#E97132"]}
                  {...sizing}
                />
              </ThemeProvider>
            </div>
            <div className="basis-2/6  text-start self-center">
              <div className="">
                <div className="flex flex-row">
                  <div className="w-3/4  text-end ">วันทั้งหมด</div>
                  <div className="w-1/4  text-center">{dataAllTime}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-[14px] h-[14px] rounded-full items-baseline mt-1 bg-[#3B7D23]"></div>
                  <div className="w-3/4 pl-2  text-start ">ตรงเวลา</div>
                  <div className="w-1/4  text-center">{dataOnTime}</div>
                </div>
                <div className="flex flex-row">
                  <div className="w-[14px] h-[14px] rounded-full items-baseline mt-1 bg-[#E97132]"></div>
                  <div className="w-3/4  pl-2 text-start ">มาสาย</div>
                  <div className="w-1/4  text-center">{dataLateTime}</div>
                </div>
              </div>
              <div className=""></div>
              <div className=""></div>
            </div>
          </div>
        </div>

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

      <div className="bg-[#E7F5FF] w-full mt-3 pb-3 h-[500px] max-h-svh hover:max-h-screen">
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
            {loading ? (
              <div className="text-center">Loading..</div>
            ) : (
              <div>
                {datalog.map((v: any, index: any) => {
                  return (
                    <div
                      className="flex flex-row items-center mt-1"
                      key={index}
                    >
                      <div className="  text-black  basis-1/3 text-center">
                        {dayjs(v.work_date)
                          .locale("th")
                          .add(543, "years")
                          .format("DD MMM YYYY")}
                      </div>
                      <div className="basis-1/3">
                        <div className="flex flex-row justify-center">
                          {v.clockin.toString().substring(0, 5)}
                        </div>
                      </div>
                      <div className="basis-1/3">
                        <div className="flex flex-row justify-center">
                          {v.clockout
                            ? v.clockout.toString().substring(0, 5)
                            : ""}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default TimeLinePage;
