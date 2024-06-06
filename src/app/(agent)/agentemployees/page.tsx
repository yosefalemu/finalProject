"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
  CircleEllipsis,
  File,
  FileBadge,
  ReceiptText,
  Search,
  Shield,
  ShieldBan,
  ShieldCheck,
  ThumbsDown,
  ThumbsUpIcon,
} from "lucide-react";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Application, OrdinaryUser } from "@/payload-types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { RejectAgent, TRejectAgent } from "@/validators/agent-validators";

const AgentEmployees = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.employee.getAgentEmployees.useInfiniteQuery({
    limit: 10,
  });
  const agents = data?.pages[0].items;
  console.log("AGENT FOUND", agents);

  const { mutate, isLoading: loadingFireEmployee } =
    trpc.employee.fireEmployee.useMutation({
      onSuccess: () => {
        toast.success("Agent access restored.");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const fireEmployee = (employeeId: string) => {
    mutate({ employeeId });
  };

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
      ) : agents?.length === 0 ? (
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
                There is no agent registered yet.
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
                  <TableHead className="text-lg text-center text-customColor">
                    First Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Middle Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Last Name
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Sex
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Age
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Region
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    City
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Position
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Phone
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Details
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Fire
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents!.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      className={`${index % 2 === 0 ? "" : "bg-gray-100"}`}
                    >
                      <TableCell className="text-center text-customColor">
                        {item.firstName}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.middleName}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.lastName}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.sex}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.age}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.regionofemployment}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.cityofemployment}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.employmentposition}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {item.phoneNumber}
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={() =>
                          router.push(`/agentemployees/${item.id}`)
                        }
                      >
                        <div className="flex items-center justify-center text-green-500 cursor-pointer">
                          <ReceiptText />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-center cursor-pointer">
                          <Dialog>
                            <DialogTrigger>
                              <ShieldBan className="text-red-500" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-fit h-fit p-4 flex flex-col">
                              <DialogHeader>
                                <DialogDescription className="text-center text-lg">
                                  Are you sure?
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="pt-5 flex items-center justify-center">
                                <Button
                                  type="button"
                                  className="px-10 bg-red-600 hover:bg-red-800"
                                  disabled={loadingFireEmployee}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="px-10"
                                  onClick={() => fireEmployee(item.id)}
                                  disabled={loadingFireEmployee}
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
export default AgentEmployees;
