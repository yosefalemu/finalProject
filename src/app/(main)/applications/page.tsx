"use client";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/client";
import {
  CircleEllipsis,
  ReceiptText,
  Search,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ScreenerApplication = () => {
  const router = useRouter();
  const { data, isLoading, isError } =
    trpc.screener.getApplicationForScreener.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );

  console.log("APPLICATIONS", data?.pages[0]);
  const applications = data?.pages[0].items;

  return (
    <>
      {isLoading ? (
        <div className="p-6 h-full flex flex-col items-center gap-y-6">
          <div className="flex justify-center w-1/4">
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="flex flex-col justify-between w-full h-[calc(100vh-17rem)] ">
            <div className="flex flex-col gap-y-4 w-full h-full">
              <Skeleton className="h-14 w-full bg-gray-300" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="flex justify-center gap-x-4">
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-10" />
            </div>
          </div>
        </div>
      ) : applications?.length === 0 ? (
        <div className="w-full h-[calc(100vh-9rem)] flex flex-col justify-between p-8">
          <p className="w-full h-full flex items-center justify-center">
            <div className="h-3/4">
              <div className="relative h-80 w-80">
                <Image
                  fill
                  src={"/mainImages/emptyNotification.png"}
                  alt="Empty"
                  className="object-contain"
                />
              </div>
              <h1 className="text-customColor text-xl">
                You haven't received any applications yet.
              </h1>
            </div>
          </p>
        </div>
      ) : (
        <div className="p-6 h-full flex flex-col items-center gap-y-6">
          <div className="flex items-center justify-center gap-2 w-full sm:w-3/4 lg:w-5/12 relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Search
                size={22}
                className="text-gray-500 cursor-pointer"
                strokeWidth={5}
              />
            </div>
            <Input
              placeholder="Search by employee name"
              className="py-7 px-14 rounded-lg text-lg focus-visible:ring-gray-400"
            />
          </div>
          <div className="w-full h-[calc(100vh-17rem)] flex flex-col justify-between">
            <Table className="w-full border border-violet-600">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-lg text-customColor">
                    First Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Middle Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Last Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Agent Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Gender
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Age
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    National Id
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Phone
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Status
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Manager Status
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`${index % 2 === 0 ? "" : "bg-gray-100"}`}
                  >
                    <TableCell>
                      {typeof item.applier === "object"
                        ? item.applier.firstName
                        : "Not available"}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {typeof item.applier === "object"
                        ? item.applier.middleName
                        : "Not available"}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {typeof item.applier === "object"
                        ? item.applier.lastName
                        : "Not available"}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.agentName}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.sex}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center text-customColor cursor-pointer">
                        {item.age}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {typeof item.applier === "object"
                        ? item.applier.nationalId
                        : "Not available"}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {typeof item.applier === "object"
                        ? item.applier.phoneNumber
                        : "Not available"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-center">
                        <CircleEllipsis className="text-orange-300" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-center text-green-500 cursor-pointer">
                        {item.responseOfManager === "pending" ? (
                          <CircleEllipsis className="text-orange-300" />
                        ) : item.responseOfManager === "rejected" ? (
                          <ThumbsDown className=" text-red-600" />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={() => router.push(`applications/${item.id}`)}
                    >
                      <div className="flex items-center justify-center text-green-500 cursor-pointer">
                        <ReceiptText />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ScreenerApplication;
