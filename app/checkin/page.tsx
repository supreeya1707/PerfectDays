import React, { useEffect} from 'react'
import liff from "@line/liff"
export default function page() {
  useEffect(() => { 
liff.init({liffId: ' '})
  },[]);
  return (
    <div>page</div>
  )
}
