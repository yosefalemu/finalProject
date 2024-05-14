"use client";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
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
    <div className="fixed bg-customColor text-white h-28 top-0 z-50 inset-x-0 border-b-2 border-customColorThree">
      <MaxWidthWrapper className="md:px-0">
        <div className="flex items-center justify-between w-full">
          <Link href={"/"}>
            <div className="relative w-28 h-28 rounded-full overflow-hidden">
              <Image
                fill
                src={"/mainImages/logo.png"}
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
      </MaxWidthWrapper>
    </div>
  );
};
export default MainNavBar;
