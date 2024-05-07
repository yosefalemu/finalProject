"use client";
import ApplicationMain from "@/components/ApplicationMain";
import { useUser } from "@/hooks/user";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";

const ApplyPage = () => {
  const { userId } = useUser();
  const { data } = trpc.application.checkPersmission.useQuery({
    applier: userId,
  });

  return (
    <div className="h-full">
      {userId === "" ? (
        <div className="h-full flex flex-col items-center justify-center border border-teal-500">
          <div className="h-2/3 flex flex-col items-center">
            <div className="relative h-80 w-80">
              <Image fill src={"/mainImages/logo.png"} alt="LOGO" />
            </div>
            <p className="text-customColor text-lg">Please login first</p>
            <Link href={"/sign-in"} className="text-sm text-customColor">
              Sign in
            </Link>
          </div>
        </div>
      ) : data?.success === true ? (
        <ApplicationMain />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="h-4/5 flex flex-col items-center">
            {" "}
            <div className="relative h-80 w-80">
              <Image fill src={"/mainImages/logo.png"} alt="LOGO" />
            </div>
            <p className="text-2xl text-customColor text-center w-2/3">
              Your request has been received, and we're awaiting further
              instructions. Please hold while we prepare our response.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ApplyPage;
