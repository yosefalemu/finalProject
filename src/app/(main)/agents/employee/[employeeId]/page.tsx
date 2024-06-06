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
import { Agent, Application, OrdinaryUser } from "@/payload-types";
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

const EmployeeDetails = ({ params }: { params: { employeeId: string } }) => {
  console.log("EMPLOYEE ID", params.employeeId);

  const {
    data: SingleEmployee,
    isLoading,
    isError,
  } = trpc.employee.getSingleEmployee.useQuery({
    employeeId: params.employeeId,
  });
  console.log("EMPLOYEE FOUND", SingleEmployee);
  const prevAgents = SingleEmployee?.singleEmployee.prevAgents as Agent[];
  const prevAgentsName = prevAgents?.map((item) => {
    const application = item.application as Application;
    return application.agentName;
  });

  return (
    <>
      {isError ? (
        <div className="p-6 h-full flex flex-col items-center gap-y-6">
          <div className="flex items-center justify-center gap-x-4 w-full h-[calc(100vh-17rem)]">
            ERROR
          </div>
        </div>
      ) : isLoading ? (
        <div className="p-6 h-full flex items-center justify-center gap-y-6">
          <div className="flex gap-x-4 w-full h-[calc(100vh-17rem)] py-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex-1 flex flex-col gap-y-4 h-full">
                {Array.from({ length: 9 }).map((_, subIndex) => (
                  <Skeleton
                    key={subIndex}
                    className="h-16 w-full bg-gray-300"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 border h-[calc(100vh-9rem)] flex flex-col items-center justify-center gap-y-6">
          <div className="w-full h-full flex flex-col justify-between py-4">
            <div className="flex items-end justify-between gap-x-6 h-full text-customColor">
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md">
                  Basic Information
                </h1>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">First Name</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.firstName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Middle Name</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.middleName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Last Name</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.lastName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Sex</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.sex}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Age</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.age}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Educational level</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.educationLevel}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-12 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium">National Id</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.nationalId}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Phone Number</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.phoneNumber}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md">
                  Supplementary Information
                </h1>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Employement date</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.dateOfEmployement}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Forensic record</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.middleName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Medical records</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.lastName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Employement region</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.regionofemployment}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Employement city</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.cityofemployment}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">specific place</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.specificplaceofemployment}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Position</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.employmentposition}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Previous agents</h1>
                    <div className="flex-1 flex flex-col items-center">
                      {prevAgentsName.map((item, index) => (
                        <h1 key={index}>{item}</h1>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md">
                  Resident Information
                </h1>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Region</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.region}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Zone</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.zone}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Woreda</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.woreda}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Kebele</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.kebele}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">House Number</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.houseNumber}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Martial status</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.martialStatus}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md">
                  Get caught Information
                </h1>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">First Name</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtFirstName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Middle Name</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtMiddleName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Last Name</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtLastName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Region</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtRegion}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Zone</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtZone}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Kebele</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtKebele}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">House Number</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtHouseNumber}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-12 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium">National Id</h1>
                    <h1 className="flex-1">
                      {SingleEmployee.singleEmployee.getCoughtNationalId}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EmployeeDetails;
