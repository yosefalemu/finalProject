"use client";
import ImageSlider from "@/components/imageSlider";
import { Button } from "@/components/ui/button";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import {
  TVerifyApplication,
  TVerifyIndividualsApplication,
  TRejectApplication,
  RejectApplication,
  VerifyIndividualsApplication,
} from "@/validators/verify-application";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PdfViewer from "@/components/Pdfreader";
import { useRouter } from "next/navigation";

const ApplicationDetail = ({ params }: { params: { agentId: string } }) => {
  const { data, isLoading, isError } =
    trpc.screener.getSingleApplication.useQuery({
      applicationId: params.agentId,
    });

  console.log("APPLICATION ID", params.agentId);

  console.log("APPLICATION FOUND", data);

  return (
    <div className="p-6 flex flex-col items-center justify-center h-[calc(100vh-17rem)]">
      {isLoading ? (
        <div className="p-6 h-full flex items-center justify-center w-full">
          <div className="grid grid-cols-12 gap-6 h-full w-full mt-12">
            <div className="col-span-12 flex items-center justify-center">
              <Skeleton className="h-14 w-1/3" />
            </div>
            <div className="col-span-6 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-6 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-4/5 h-4/5">
          <h1 className="text-4xl text-center">Application Details</h1>
          <div className="mt-8 w-full flex items-start gap-x-10">
            {/* LEFTCONTENT */}
            <div className="flex-1 flex flex-col gap-y-2 border px-8 py-6 rounded-md">
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Agent Name</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {data?.agentName}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">First Name</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.firstName
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Middle Name</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.middleName
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Last Name</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.lastName
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Age</h1>

                <h1 className="flex-1 text-xl font-normal">{data?.age}</h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Gender</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {data?.sex.toUpperCase()}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">
                  House Number
                </h1>

                <h1 className="flex-1 text-xl font-normal">
                  {data?.houseNumber}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">National Id</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.nationalId
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Email</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.email
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">
                  Phone Number
                </h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.phoneNumber
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">City</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.city
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Woreda</h1>

                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.woreda
                    : "Not available"}
                </h1>
              </div>
              <div className="flex items-center">
                <h1 className="flex-1 text-customColor text-xl">Kebele</h1>
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.kebele
                    : "Not available"}
                </h1>
              </div>
            </div>
            {/* RIGHT CONTENT */}
            <div className="flex-1 flex flex-col gap-y-4 border px-8 py-6 rounded-md">
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">Agent Logo</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        Agent Logo
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the agent logo carefefully and verify if it is
                        correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.agentLogoUrl!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">
                  Profile picture
                </h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        Profile picture
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the profile picture carefefully and verify if it is
                        correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.profileUrl!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">National Id</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        National Id
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the national id carefefully and verify if it is
                        correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.nationalIdUrls!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">
                  Educational files
                </h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        Educational files
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the educational files carefefully and verify if it
                        is correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.educationalUrls!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">
                  Medical files
                </h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        Medical files
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the medical files carefefully and verify if it is
                        correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.medicalUrls!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">Employee Id</h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        Employee Id
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the employee id carefefully and verify if it is
                        correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.employeeIdUrls!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-x-4">
                <h1 className="flex-1 text-customColor text-xl">
                  Uniform Details
                </h1>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[750px] flex flex-col">
                    <DialogHeader>
                      <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                        Uniform Details
                      </DialogTitle>
                      <DialogDescription className="text-center text-lg">
                        View the uniform details carefefully and verify if it is
                        correct
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                      <PdfViewer fileUrl={data?.uniformDetailsUrls!} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ApplicationDetail;
