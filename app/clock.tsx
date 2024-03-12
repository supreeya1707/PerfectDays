"use client";
import React, { useEffect, useState } from 'react'
type Props = {
  time: number;
};
export const Clock = ({ time: initial }: Props) => {
    const [time, setTime] = useState(new Date(initial));
    console.log("time", new Date().getTime);
    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);
  
  return <div className="text-2xl">{time.toLocaleTimeString()}</div>;
}

