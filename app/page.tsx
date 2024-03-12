import Image from "next/image";

export default function Home() {
  return (
    <div className="containner">
      {/* <h1>TEST</h1> */}

      <div className="bg-local"></div>

      <div className="flex justify-center ">
        <Image
          className="fixed top-0 left-0 right-0"
          src="/image/MOPH 4.png"
          width={50}
          height={70}
          alt="Picture of the author"
        />
        <Image
          src="/image/ID-Front 1.png"
          width={331}
          height={603}
          alt="Picture of the author"
        />
      </div>
    </div>
  );
}
