import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  pathname?: string;
};

export default function HomeNavbar({ pathname }: Props) {
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
        <div className="flex items-center gap-x-4">
          {pathname === "/registor-as-agent" ? null : (
            <Link href={"registor-as-agent"}>
              <Button
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className:
                      "bg-transparent hover:bg-transparent rounded-none text-customColor text-lg",
                    size: "lg",
                  })
                )}
              >
                Registor
              </Button>
            </Link>
          )}
          {pathname == "/sign-in" ? null : (
            <Link href={"/sign-in"}>
              <Button
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className:
                      "bg-transparent hover:bg-transparent rounded-none text-customColor text-lg ",
                    size: "lg",
                  })
                )}
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
