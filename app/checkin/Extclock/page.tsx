import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React from 'react'

import Image from "next/image";
function page() {
  return (
   
      <div className=" bg-local bgImgback grid grid-cols-1 ">
      <div className=" mophlogo ">
        <Image
          src="/perfectdays2/image/MOPH 4.png"
          alt={""}
          width={47}
          height={48}
        ></Image>
      </div>
    </div>
  
    
  );
}

export default page