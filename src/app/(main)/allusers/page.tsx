"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Briefcase,
  File,
  FileBadge,
  ReceiptText,
  Search,
  ThumbsUp,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const Employees = () => {
  const router = useRouter();
  const { data, isLoading, isError } =
    trpc.manager.getAllUsers.useInfiniteQuery({
      limit: 5,
    });
  const employees = data?.pages[0].items;
  console.log("EMPLOYEEES", employees);

  return (
    <div>
      {isError ? (
        <div>Error</div>
      ) : isLoading ? (
        <div className="p-6 h-full flex flex-col items-center gap-y-6">
          <div className="flex justify-center w-1/4">
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="flex flex-col justify-between w-full h-[calc(100vh-17rem)]">
            <div className="flex flex-col gap-y-4 w-full h-full">
              <Skeleton className="h-14 w-full bg-gray-300" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
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
      ) : employees?.length === 0 ? (
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
                There is no employee registered yet.
              </h1>
            </div>
          </p>
        </div>
      ) : (
        <div className="p-6 border h-full flex flex-col items-center gap-y-6">
          <div className="flex items-center justify-center gap-2 w-full sm:w-3/4 lg:w-5/12 relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Search
                size={22}
                className="text-gray-500 cursor-pointer"
                strokeWidth={5}
              />
            </div>
            <Input
              placeholder="Search by agent name"
              className="py-7 px-14 rounded-lg text-lg focus-visible:ring-customColor"
            />
          </div>
          <div className="w-full h-[calc(100vh-18rem)] flex flex-col justify-between">
            <Table className="w-full">
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
                    National Id
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Phone
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Email
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Sex
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Role
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    City
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Woreda
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees?.map((item, index) => (
                  <TableRow
                    key={index}
                    className={`${index % 2 === 0 ? "" : "bg-gray-100"}`}
                  >
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.middleName}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.lastName}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.nationalId}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.email}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.sex}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.role}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.city}
                    </TableCell>
                    <TableCell className="text-center text-customColor">
                      {item.woreda}
                    </TableCell>
                    <TableCell
                      className="text-right"
                      onClick={() => router.push(`/allusers/${item.id}`)}
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
    </div>
  );
};
export default Employees;
