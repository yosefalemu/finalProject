"use client";
import Image from "next/image";
import Notification from "./Notification";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";

const MainNavBar = () => {
  const handleLogout = () => {
    document.cookie =
      "payload-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("logged-in-user");
    localStorage.removeItem("refresh-state");
    window.location.href = "/sign-in";
  };
  const { data: userProfile, refetch } = trpc.auth.getUserProfile.useQuery();
  // Refetch data every 1 minute (60,000 milliseconds)
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [refetch]);
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <div className="relative w-[800px] h-28">
            <Image
              fill
              src={"/mainImages/logo2.png"}
              alt="LOGOIMAGES"
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex items-center gap-x-8">
          <Notification />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-1 border-customColorThree">
                <Image
                  fill
                  src={
                    userProfile?.userFound.profile ||
                    "/mainImages/noprofile.png"
                  }
                  alt="LOGOIMAGES"
                  className="object-cover"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div
                  className="py-1 flex items-center justify-start gap-x-2 text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <h1 className="text-sm">Logout</h1>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default MainNavBar;
