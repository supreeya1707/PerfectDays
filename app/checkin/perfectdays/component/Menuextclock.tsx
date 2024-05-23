import { Button } from '@/components/ui/button';
import React from 'react'

const Menuextclock = () => {
  return (
    <div className="mb-24">
      <div className="flex flex-col  items-center mb-20 ">
        <div className="justify-items-center">
          <Button className="border-4 bg-[#3956BF] border-gray w-[228px] h-[58px] text-[24px] cursor-pointer">
            Ext. CLOCK IN
          </Button>
        </div>
        <div className="justify-items-center">
          <Button className="border-4 bg-[#531805] border-gray w-[228px] h-[58px] rounded-lg text-[24px]  ">
           Over Time (OT)
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Menuextclock

/* botton */



