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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import {
  TVerifyApplicationByScreener,
  TVerifyIndividualsApplicationByScreener,
  TRejectApplicationByScreener,
} from "@/validators/verifyScreener";
import { useState } from "react";
import { toast } from "sonner";

const ApplicationDetail = ({
  params,
}: {
  params: { applicationId: string };
}) => {
  console.log("applicationId", params.applicationId);
  const [currentVerification, setCurrentVerification] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(
    null
  );
  const [rejectedDescriptions, setRejectedDescriptions] = useState<string>("");

  const { data, isLoading, isError } =
    trpc.screener.getSingleApplication.useQuery({
      applicationId: params.applicationId,
    });

  console.log("APPLICATION FOUND", data);

  const validAgentLogoUrl = data?.agentLogoUrl
    .map(({ url }) => url)
    .filter(Boolean) as string[];

  const validProfileUrl = data?.profileUrl
    .map(({ url }) => url)
    .filter(Boolean) as string[];
  const validNationalIdUrl = data?.nationalIdUrls
    .map(({ url }) => url)
    .filter(Boolean) as string[];
  const validMedicalUrl = data?.medicalUrls
    .map(({ url }) => url)
    .filter(Boolean) as string[];
  const validEducationUrl = data?.educationalUrls
    .map(({ url }) => url)
    .filter(Boolean) as string[];
  const validEmployeeIdUrl = data?.employeeIdUrls
    .map(({ url }) => url)
    .filter(Boolean) as string[];
  const validUniformDetailsUrl = data?.uniformDetailsUrls
    .map(({ url }) => url)
    .filter(Boolean) as string[];
  //VERIFY INDIVIDUAL ITEMS
  const { mutate: verifyIndividuals, isLoading: isLoadingVerify } =
    trpc.screener.verifyIndividualsByScreener.useMutation({
      onSuccess: () => {
        toast.success(
          `${currentVerification}  ${
            verificationStatus ? "verified" : "rejected"
          } successfully`
        );
      },
      onError: () => {},
    });

  const verifyByScreener = ({
    controller,
    approved,
    applicationId,
  }: TVerifyIndividualsApplicationByScreener) => {
    verifyIndividuals({ controller, approved, applicationId });
  };
  //VERIFY APPLICATION
  const { isLoading: isLoadingApproveByScreener, mutate: approveByScreener } =
    trpc.screener.approveByScreener.useMutation({
      onSuccess: () => {
        toast.success("Application is verified successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const verifyApplication = ({
    applicationId,
  }: TVerifyApplicationByScreener) => {
    approveByScreener({ applicationId });
  };
  // REJECT APPLICATION
  const { mutate: rejectByScreener } =
    trpc.screener.rejectByScreener.useMutation({
      onSuccess: () => {
        toast.success("Application is rejected successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const rejectApplication = ({
    applicationId,
    rejectedDescriptions,
  }: TRejectApplicationByScreener) => {
    rejectByScreener({
      applicationId,
      rejectedDescriptions,
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
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      Agent Logo
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the agent logo carefefully and verify if it is
                      correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validAgentLogoUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "agentLogoUrl",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Agent Logo is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
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
                Profile Picture
              </h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      Profile Picture
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the applicant profile carefefully and verify if it is
                      correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validProfileUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "profileUrl",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Profile picture is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
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
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      National Id
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the applicant national id carefefully and verify if
                      it is correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validNationalIdUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "nationalIdUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("National id is");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
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
                Educational Files
              </h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      Educational Files
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the applicant educational files carefefully and
                      verify if it is correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validEducationUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "educationalUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Educational files are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
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
              <h1 className="flex-1 text-customColor text-xl">Medical Files</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[750px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      Medical Files
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the applicant medical files carefefully and verify if
                      it is correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validMedicalUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "medicalUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Medical files are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
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
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      Employee Id
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the applicant employee Id carefefully and verify if
                      it is correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validEmployeeIdUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "employeeIdUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Employees id are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
                          approved: true,
                          controller: "employeeIdUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Employees id are");
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
                    <DialogTitle className="text-3xl text-customColor text-center font-normal">
                      Uniform Details
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg">
                      View the applicant uniform Details carefefully and verify
                      if it is correct
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <ImageSlider validImageUrl={validUniformDetailsUrl} />
                  </div>
                  <DialogFooter className="pt-5">
                    <Button
                      type="button"
                      className="px-10 bg-red-600 hover:bg-red-800"
                      onClick={() => {
                        verifyByScreener({
                          approved: false,
                          controller: "uniformDetailsUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(false);
                        setCurrentVerification("Uniform details are");
                      }}
                      disabled={isLoadingVerify}
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      className="px-10"
                      onClick={() => {
                        verifyByScreener({
                          approved: true,
                          controller: "uniformDetailsUrls",
                          applicationId: params.applicationId,
                        });
                        setVerificationStatus(true);
                        setCurrentVerification("Uniform details are");
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
              <div className="w-[800px] flex flex-col gap-y-4">
                <Label htmlFor="message" className="text-2xl text-customColor">
                  Type your reason
                </Label>
                <Textarea
                  placeholder="Type reject reason"
                  id="message"
                  rows={15}
                  onChange={(e) => setRejectedDescriptions(e.target.value)}
                />
              </div>

              <DialogFooter className="pt-5 flex items-center justify-center">
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
                    rejectApplication({
                      applicationId: params.applicationId,
                      rejectedDescriptions: rejectedDescriptions,
                    });
                  }}
                  disabled={isLoadingApproveByScreener}
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
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="px-10"
                  onClick={() => {
                    verifyApplication({
                      applicationId: params.applicationId,
                    });
                  }}
                  disabled={isLoadingApproveByScreener}
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
