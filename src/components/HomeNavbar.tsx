import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  pathname?: string;
};

export default function HomeNavbar({ pathname }: Props) {
  return (
    <div className="bg-white border-b border-gray-400 sticky h-28 z-50 top-0 inset-x-0">
      <MaxWidthWrapper className="flex items-center justify-between">
        <div className="relative h-28 w-28 rounded-full">
          <Image
            fill
            src="/mainImages/logo.png"
            alt="LOGO"
            className="object-fill"
          />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-3xl font-semibold text-customColor">
            Private security agent managnment system
          </h1>
        </div>
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
      </MaxWidthWrapper>
    </div>
  );
}
