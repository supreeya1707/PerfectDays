'use client';
import { Button } from '@/components/ui/button'
import React from 'react'

const extclock = () => {
  return (
    <div>
          <div className="container">
              <div className="grid grid-cols-1 mb-3">
                  <div className=" grid grid-cols-1  justify-self-center ">
                  <Button className="border-4 bg-[#DFE0E1] border-white w-[178px] h-[58px] rounded-lg text-lg disabled:true ">
          OUT OF RANGE
        </Button>
              </div>
              </div>
        
      </div>
    </div>
  );
}

export default extclock