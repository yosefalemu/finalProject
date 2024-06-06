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

const Agents = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.agent.getAgents.useInfiniteQuery({
    limit: 10,
  });
  const agents = data?.pages[0].items;
  console.log("AGENT FOUND", agents);

  const { register, watch, reset } = useForm<TRejectAgent>({
    resolver: zodResolver(RejectAgent),
  });

  const { mutate: verifyForFirstTime, isLoading: loadingVerifyAgentFirst } =
    trpc.agent.verifyAgentFirstTime.useMutation({
      onSuccess: () => {
        toast.success("Agent verification successful.");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const { mutate: verifyAgent, isLoading: loadingVerifyAgent } =
    trpc.agent.verifyAgent.useMutation({
      onSuccess: () => {
        toast.success("Agent access restored.");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const { mutate: rejectAgent, isLoading: loadingRejectAgent } =
    trpc.agent.rejectAgent.useMutation({
      onSuccess: () => {
        toast.success("Agent access Denied.");
        reset({ rejectionReason: "" });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const verifyAgentFun = (agentId: string, firstTime: boolean) => {
    if (firstTime) {
      verifyForFirstTime({ agentId });
    } else {
      verifyAgent({ agentId });
    }
  };
  const rejectAgentFun = (agentId: string, rejectionReason: string) => {
    rejectAgent({ agentId, rejectionReason });
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
                    Agent Name
                  </TableHead>
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
                    Phone
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Status
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Employees
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Details
                  </TableHead>
                  <TableHead className="text-lg text-center text-customColor">
                    Verify
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents!.map((item, index) => {
                  const agentData = item.application as Application;
                  const agentAdminData = agentData.applier as OrdinaryUser;
                  console.log("AGENT ADMIN DATA", agentAdminData);
                  console.log("AGENT DATA", agentData);

                  return (
                    <TableRow
                      key={index}
                      className={`${index % 2 === 0 ? "" : "bg-gray-100"}`}
                    >
                      <TableCell>{agentData.agentName}</TableCell>
                      <TableCell className="text-center text-customColor">
                        {agentAdminData.firstName}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {agentAdminData.middleName}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {agentAdminData.lastName}
                      </TableCell>
                      <TableCell className="text-center text-customColor">
                        {agentAdminData.phoneNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center cursor-pointer">
                          {item.permission === "pending" ? (
                            <CircleEllipsis className="text-customColorFour" />
                          ) : item.permission === "allowed" ? (
                            <ThumbsUpIcon className="text-green-500" />
                          ) : (
                            <ThumbsDown className="text-red-700" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell
                        onClick={() =>
                          router.push(`/agents/employees/${item.id}`)
                        }
                      >
                        <div className="flex items-center justify-center cursor-pointer">
                          <Briefcase className="text-customColor" />
                        </div>
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={() =>
                          router.push(
                            `/agents/${(item.application as Application).id}`
                          )
                        }
                      >
                        <div className="flex items-center justify-center text-green-500 cursor-pointer">
                          <ReceiptText />
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-center cursor-pointer">
                          {item.permission === "pending" ? (
                            <Dialog>
                              <DialogTrigger>
                                <ShieldCheck className="text-green-500" />
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
                                    disabled={loadingVerifyAgentFirst}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="px-10"
                                    onClick={() =>
                                      verifyAgentFun(item.id, true)
                                    }
                                    disabled={loadingVerifyAgentFirst}
                                  >
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : item.permission === "allowed" ? (
                            <Dialog>
                              <DialogTrigger>
                                <Shield className="text-red-700" />
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[750px] flex flex-col">
                                <DialogHeader>
                                  <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                                    Access denied
                                  </DialogTitle>
                                  <DialogDescription className="text-center text-lg">
                                    Provide clear reason for access Denied
                                  </DialogDescription>
                                </DialogHeader>
                                <Textarea
                                  {...register("rejectionReason")}
                                  className="focus-visible:ring-customColor"
                                  placeholder="Type reject reason or approval message"
                                />
                                <DialogFooter className="pt-5">
                                  <Button
                                    type="button"
                                    className="px-10 bg-red-600 hover:bg-red-800"
                                    onClick={() => {
                                      rejectAgentFun(
                                        item.id,
                                        watch("rejectionReason")
                                      );
                                    }}
                                    disabled={loadingRejectAgent}
                                  >
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Dialog>
                              <DialogTrigger>
                                <ShieldCheck className="text-green-500 " />
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
                                    disabled={loadingVerifyAgent}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="px-10"
                                    onClick={() =>
                                      verifyAgentFun(item.id, false)
                                    }
                                    disabled={loadingVerifyAgent}
                                  >
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
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
export default Agents;
