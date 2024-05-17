"use client";
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

const ApplicationDetail = ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const router = useRouter();
  const [currentVerification, setCurrentVerification] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(
    null
  );

  const { data, isLoading, isError } =
    trpc.manager.getSingleApplication.useQuery({
      applicationId: params.applicationId,
    });

  console.log("APPLICATION FOUND", data);

  //VERIFY INDIVIDUAL ITEMS
  const {
    register: registerIndividualVerify,
    reset,
    watch,
  } = useForm<TVerifyIndividualsApplication>({
    resolver: zodResolver(VerifyIndividualsApplication),
  });
  const { mutate: verifyIndividuals, isLoading: isLoadingVerify } =
    trpc.manager.verifyIndividualsByManager.useMutation({
      onSuccess: () => {
        toast.success(
          `${currentVerification}  ${
            verificationStatus ? "verified" : "rejected"
          } successfully`
        );
        reset({ message: "" });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const verifyByManager = ({
    controller,
    approved,
    applicationId,
    message,
  }: TVerifyIndividualsApplication) => {
    verifyIndividuals({ controller, approved, applicationId, message });
  };
  //VERIFY APPLICATION
  const { isLoading: isLoadingForIndividualVerify, mutate: approveByManager } =
    trpc.manager.approveByManager.useMutation({
      onSuccess: () => {
        toast.success("Application is verified successfully");
        setTimeout(() => {
          router.push("/applications");
        }, 4000);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const verifyApplicationManager = ({ applicationId }: TVerifyApplication) => {
    approveByManager({ applicationId });
  };
  // REJECT APPLICATION
  const {
    setValue,
    formState: { errors },
  } = useForm<TRejectApplication>({
    resolver: zodResolver(RejectApplication),
  });

  useEffect(() => {
    setValue("applicationId", params.applicationId);
  }, []);
  const { mutate: rejectByManager, isLoading: isLoaingForRejection } =
    trpc.manager.rejectByManager.useMutation({
      onSuccess: () => {
        toast.success("Application is rejected successfully");
        setTimeout(() => {
          router.push("/applications");
        }, 4000);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const rejectApplicationManager = ({ applicationId }: TRejectApplication) => {
    rejectByManager({
      applicationId,
    });
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center border h-full border-red-400">
      <div className="w-4/5 h-4/5">
        <h1 className="text-4xl text-center">Application Details</h1>
        <div className="mt-8 w-full flex items-start gap-x-10">
          {/* LEFTCONTENT */}
          <div className="flex-1 flex flex-col gap-y-2 border px-8 py-6 rounded-md">
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Agent Name</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {data?.agentName}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">First Name</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.firstName
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Middle Name</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.middleName
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Last Name</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.lastName
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Age</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">{data?.age}</h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Gender</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {data?.sex.toUpperCase()}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">House Number</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {data?.houseNumber}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">National Id</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.nationalId
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Email</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.email
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Phone Number</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.phoneNumber
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">City</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.city
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Woreda</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.woreda
                    : "Not available"}
                </h1>
              )}
            </div>
            <div className="flex items-center">
              <h1 className="flex-1 text-customColor text-xl">Kebele</h1>
              {isLoading ? (
                <Skeleton className="flex-1 h-[35px] w-[250px]" />
              ) : (
                <h1 className="flex-1 text-xl font-normal">
                  {typeof data?.applier === "object"
                    ? data.applier.kebele
                    : "Not available"}
                </h1>
              )}
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject Agent Logo
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "agentLogoUrl",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Agent Logo is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "agentLogoUrl",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Agent Logo is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject Profile Picture
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "profileUrl",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Profile picture is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "profileUrl",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Profile picture is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject National id
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "nationalIdUrls",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("National id is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "nationalIdUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("National id is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
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
                      View the educational files carefefully and verify if it is
                      correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <PdfViewer fileUrl={data?.educationalUrls!} />
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject Educational files
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "educationalUrls",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Educational files are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "educationalUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Educational files are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-x-4">
              <h1 className="flex-1 text-customColor text-xl">Medical files</h1>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject Medical Files
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "medicalUrls",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Medical files are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "medicalUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Medical files are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject Employee Id
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "employeeIdUrls",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Employee id is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "employeeIdUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Employee id is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Reject</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Reject Uniform Detail
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      Provide clear reason for the rejection
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    {...registerIndividualVerify("message")}
                    className="focus-visible:ring-customColor"
                    placeholder="Type reject reason or approval message"
                  />
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByManager({
                          approved: false,
                          controller: "uniformDetailsUrls",
                          applicationId: params.applicationId,
                          message: watch("message"),
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Uniform detail is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Verify</Button>
                </DialogTrigger>
                <DialogContent className="w-fit flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-semibold">
                      Are you sure?
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByManager({
                          approved: true,
                          controller: "uniformDetailsUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Uniform detail  is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-x-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-10 py-6 bg-red-600 hover:bg-red-800">
                Reject Application
              </Button>
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
                  disabled={isLoaingForRejection}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-10"
                  onClick={() =>
                    rejectApplicationManager({
                      applicationId: params.applicationId,
                    })
                  }
                  disabled={isLoaingForRejection}
                >
                  Reject
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-10 py-6">Approve Application</Button>
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
                  disabled={isLoadingForIndividualVerify}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="px-10"
                  onClick={() => {
                    verifyApplicationManager({
                      applicationId: params.applicationId,
                    });
                  }}
                  disabled={isLoadingForIndividualVerify}
                >
                  Verify
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default ApplicationDetail;
