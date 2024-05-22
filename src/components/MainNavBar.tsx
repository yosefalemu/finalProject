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

const MainNavBar = () => {
  const handleLogout = () => {
    document.cookie =
      "payload-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("logged-in-user");
    localStorage.removeItem("refresh-state");
    window.location.href = "/sign-in";
  };

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
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-customColorThree">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
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
