"use client";
import ApplicationMain from "@/components/ApplicationMain";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/user";
import { trpc } from "@/trpc/client";
import { Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ApplyPage = () => {
  const { userId } = useUser();
  const { data, isLoading, refetch } =
    trpc.application.checkPersmission.useQuery(
      {
        applier: userId,
      },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );

  return (
    <div className="h-full px-14">
      {isLoading ? (
        <div className="p-6 h-full flex items-center justify-center">
          <div className="grid grid-cols-12 gap-6 h-full w-full mt-12">
            <div className="col-span-12 flex items-center justify-center">
              <Skeleton className="h-14 w-1/3" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-12 flex items-center justify-end">
              <Skeleton className="h-14 w-1/3" />
            </div>
          </div>
        </div>
      ) : !userId ? (
        <div className="h-full flex flex-col items-center justify-center">
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
        <div className="w-full h-[calc(100vh-17rem)] flex flex-col items-center justify-center">
          <div className="h-4/5 flex flex-col items-center">
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
