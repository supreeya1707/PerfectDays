'use client'
import { useState } from 'react'
import Menu from './component/menu'
import Overtime from './component/overtime'
import Checkintime from './component/checkintime'
import Image from "next/image";

const page = () => {

  const [step, setStep] = useState(1);
  return (
    <div>
      <div className="bg-local  bgImgback grid grid-cols-1">
        <div className="ml-14 mt-20 pt-24">
          <Image
            className=""
            src="/perfectdays2/image/MOPH 4.png"
            alt={""}
            width={47}
            height={48}
          ></Image>
        </div>

        {step === 1 && <Overtime />}
      </div>
    </div>
  );
}

export default page