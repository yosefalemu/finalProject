"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";

const RegistorAsAgent = () => {
  const router = useRouter();
  const { data } = trpc.screener.getApplicationForScreener.useInfiniteQuery({
    limit: 5,
  });

  console.log("APPLICATIONS", data?.pages[0]);
  const applications = data?.pages[0].items;

  return (
    <div className="p-6 border h-full flex flex-col items-center gap-y-14">
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
          className="py-7 px-14 rounded-lg text-lg focus-visible:ring-customColor"
        />
      </div>
      <div className="w-full border border-red-500 h-full flex flex-col justify-between">
        <Table className="w-full">
          <TableCaption>All employees availables are here</TableCaption>
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
                    {item.responseOfScreener === "pending" ? (
                      <CircleEllipsis className="text-orange-300" />
                    ) : item.responseOfManager === "approved" ? (
                      <ThumbsUp className=" text-green-500" />
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-center text-green-500 cursor-pointer">
                    {item.responseOfManager === "pending" ? (
                      <CircleEllipsis className="text-orange-300" />
                    ) : item.responseOfManager === "rejected" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <ThumbsDown className=" text-red-600" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[785px]">
                          <DialogHeader>
                            <DialogDescription className="font-normal text-customColor text-lg mt-4">
                              Application has been declined for the following
                              reasons. If you have any questions or concerns,
                              please don't hesitate to reach out to us for
                              clarification.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            {item.rejectedDescriptions}
                          </div>
                        </DialogContent>
                      </Dialog>
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
  );
};
export default RegistorAsAgent;
