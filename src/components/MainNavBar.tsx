"use client";
import Image from "next/image";
import Notification from "./Notification";
import Link from "next/link";
import { useEffect } from "react";
import { useNavbarRefresh } from "@/hooks/navbarRefresh";

const MainNavBar = () => {
  const { state } = useNavbarRefresh();
  console.log("NAVBAR", state);

  useEffect(() => {}, [state]);
  console.log("NAVBAR");

  return (
    <div className="fixed bg-white h-36 flex items-center top-0 z-50 inset-x-0 border-b-8 border-customColor">
      <div className="flex items-center justify-between w-full pl-4 pr-16">
        <Link href={"/"}>
          <div className="relative w-[1400px] h-28">
            <Image
              fill
              src={"/mainImages/logo2.png"}
              alt="LOGOIMAGES"
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex items-center gap-x-8">
          <Notification />
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <Image
              fill
              src={"/mainImages/profile.png"}
              alt="LOGOIMAGES"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainNavBar;
