import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import { useForm } from "react-hook-form";
import { type FileState } from "@/components/MultiFileDropzone";
import {
  ApplicationValidators,
  TApplicationValidator,
} from "@/validators/application-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { Button as UploadButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/user";
import { MultiFileDropzone } from "./MultiFileDropzone";
import { Application } from "@/payload-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  ReApplicationValidators,
  TReApplicationValidator,
} from "@/validators/reapply-validators";
import Image from "next/image";

type ApplicationFoundProps = {
  applicationFound: Application;
};
const ApplicationUpdate = ({ applicationFound }: ApplicationFoundProps) => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { userId } = useUser();

  //STATE MANAGENMNET FOR THE AGENT LOGO
  const [agentLogoFile, setAgentLogoFile] = useState<FileState[]>([]);

  //STATE MANAGENMENT FOR THE PROFILE PICTURE
  const [profileFile, setProfileFile] = useState<FileState[]>([]);

  //STATE MANAGNMENT FOR THE NATIONAL ID
  const [natioanalIdFiles, setNationalIdFiles] = useState<FileState[]>([]);

  //STATE MANAGNMENT FOR THE MEDICAL FILES
  const [medicalFiles, setMedicalFiles] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE FOOTPRINT
  const [footPrintFile, setFootPrintFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE JOB EXPERIENCES DETAILS
  const [jobExperienceFile, setJobExperienceFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE EDUCATION CERTEFICATES
  const [educationalFile, setEducationalFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE TRADE PERMISSION
  const [tradePermissionFile, setTradePermissionFile] = useState<FileState[]>(
    []
  );
  //STATE MANAGNMENT FOR EMPLOYEE QUALIFICATION ASSURANCE
  const [empQualificationAssuranceFile, setEmpQualificationAssuranceFile] =
    useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE STRUCTURE OF AGENCY
  const [structureOfAgencyFile, setStructureOfAgencyFile] = useState<
    FileState[]
  >([]);
  //STATE MANAGNMENT FOR THE RULES AND REGULATIONS
  const [rulesFile, setRulesFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE FORM REGISTRATION
  const [formRegistrationFile, setFormRegistrationFile] = useState<FileState[]>(
    []
  );
  //STATE MANAGNMENT FOR THE WARRANTY
  const [warrantyFile, setWarrantyFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE BANK STATMENT
  const [bankStatementFile, setBankStatementFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE HOUSE RENT PAYMNET
  const [houseRentFile, setHouseRentFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE UNIFORM DETAILS
  const [uniformDetailsFile, setUniformDetailsFile] = useState<FileState[]>([]);
  //STATE MANAGNMENT FOR THE EMPLOYEE ID
  const [employeeIdFile, setEmployeeIdFile] = useState<FileState[]>([]);

  function updateFileProgressForAgentLogo(
    key: string,
    progress: FileState["progress"]
  ) {
    setAgentLogoFile((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  function updateFileProgressForProfile(
    key: string,
    progress: FileState["progress"]
  ) {
    setProfileFile((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  function updateFileProgressForNationalId(
    key: string,
    progress: FileState["progress"]
  ) {
    setNationalIdFiles((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  function updateFileProgressForMedical(
    key: string,
    progress: FileState["progress"]
  ) {
    setMedicalFiles((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  function updateFileProgressForEducational(
    key: string,
    progress: FileState["progress"]
  ) {
    setEducationalFile((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  function updateFileProgressForUniform(
    key: string,
    progress: FileState["progress"]
  ) {
    setUniformDetailsFile((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }
  function updateFileProgressForEmployee(
    key: string,
    progress: FileState["progress"]
  ) {
    setEmployeeIdFile((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const GenderList = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];
  const handleInputChange = (fieldName: string) => {
    clearErrors(fieldName as keyof TReApplicationValidator);
  };
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TReApplicationValidator>({
    resolver: zodResolver(ReApplicationValidators),
  });

  useEffect(() => {
    if (userId) {
      setValue("applicationId", applicationFound.id);
      setValue("agentName", applicationFound.agentName);
      setValue("age", applicationFound.age);
      setValue("sex", applicationFound.sex);
      setValue("houseNumber", applicationFound.houseNumber);
    }
  }, [applicationFound.id, setValue]);

  const { isLoading, mutate, isSuccess } =
    trpc.application.reapplyApplication.useMutation({
      onError: (err: any) => {
        console.log("ERROR OCCURED");
        toast.error(err.message);
      },
      onSuccess: () => {
        console.log("SUCCESS");
        toast.success("Application is successfully");
        const timeOut = setTimeout(() => {
          router.push("/success-application");
          router.refresh();
        }, 2000);
        return () => clearTimeout(timeOut);
      },
    });
  const onSubmit = (data: TReApplicationValidator) => {
    const {
      applicationId,
      age,
      agentName,
      houseNumber,
      sex,
      agentLogoUrl,
      profileUrl,
      nationalIdUrls,
      medicalUrls,
      educationalUrls,
      uniformDetailsUrls,
      employeeIdUrls,
    } = data;
    console.log("APPLICATION SUBMIT DATA", data);
    mutate({
      applicationId: applicationFound.id,
      age: age ? age : applicationFound.age,
      agentName: agentName ? agentName : applicationFound.agentName,
      houseNumber: houseNumber ? houseNumber : applicationFound.houseNumber,
      sex: sex ? sex : applicationFound.sex,
      agentLogoUrl: agentLogoUrl ? agentLogoUrl : applicationFound.agentLogoUrl,
      profileUrl: profileUrl ? profileUrl : applicationFound.profileUrl,
      nationalIdUrls: nationalIdUrls
        ? nationalIdUrls
        : applicationFound.nationalIdUrls,
      medicalUrls: medicalUrls ? medicalUrls : applicationFound.medicalUrls,
      educationalUrls: educationalUrls
        ? educationalUrls
        : applicationFound.educationalUrls,
      uniformDetailsUrls: uniformDetailsUrls
        ? uniformDetailsUrls
        : applicationFound.uniformDetailsUrls,
      employeeIdUrls: employeeIdUrls
        ? employeeIdUrls
        : applicationFound.employeeIdUrls,
    });
  };
  const allFields = watch(); // This will give you the current value of all fields
  console.log("ALL WATCHES", allFields);
  return (
    <div className="p-6 h-full">
      {applicationFound.responseOfScreener === "rejected" ? (
        <div className="mx-auto h-full flex flex-col justify-between">
          <div className="text-center">
            <h1 className="text-3xl">Reapply page</h1>
          </div>
          <div className="flex-1 flex justify-center w-full pt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="w-fit">
                  <div className="py-2">
                    <Label
                      htmlFor="agentName"
                      className="text-xl text-customColor font-normal"
                    >
                      Agent Name
                    </Label>
                    <div className="gap-1 py-2">
                      <Input
                        {...register("agentName")}
                        placeholder={applicationFound.agentName}
                        className={cn({
                          "focus-visible:ring-red-600": errors.agentName,
                        })}
                        onChange={() => handleInputChange("agentName")}
                      />
                      {errors?.agentName && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.agentName?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <Label
                      htmlFor="age"
                      className="text-xl text-customColor font-normal"
                    >
                      Age
                    </Label>
                    <div className="gap-1 py-2">
                      <Input
                        {...register("age")}
                        placeholder={applicationFound.age}
                        className={cn({
                          "focus-visible:ring-red-600": errors.age,
                        })}
                        type="text"
                        onChange={() => handleInputChange("age")}
                      />
                      {errors?.age && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.age.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2 py-2">
                    <Label htmlFor="sex" className="text-md">
                      Sex
                    </Label>
                    <Input
                      {...register("sex")}
                      placeholder={applicationFound.sex}
                      list="gender"
                      onChange={(e) => {
                        handleInputChange("sex");
                        // handleSelectCountry(e.target.value);
                      }}
                      className={cn({
                        "focus-visible:ring-red-600": errors.sex,
                      })}
                    />
                    <datalist id="gender">
                      {GenderList.map((item: any, index: number) => (
                        <option key={index} value={item.value} />
                      ))}
                    </datalist>
                    {errors?.sex && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.sex.message}
                      </p>
                    )}
                  </div>
                  <div className="py-2">
                    <Label
                      htmlFor="houseNumber"
                      className="text-xl text-customColor font-normal"
                    >
                      House Number
                    </Label>
                    <div className="gap-1 py-2">
                      <Input
                        {...register("houseNumber")}
                        placeholder={applicationFound.houseNumber}
                        className={cn({
                          "focus-visible:ring-red-600": errors.houseNumber,
                        })}
                        type="text"
                        onChange={() => handleInputChange("houseNumber")}
                      />
                      {errors?.houseNumber && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.houseNumber.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-fit">
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="agentLogoUrl"
                        className="text-xl text-customColor font-normal"
                      >
                        Agent Logo
                      </Label>
                      {applicationFound.statusAgentLogoUrl === "rejected" && (
                        <p className="text-red-600">REJECTED</p>
                      )}
                    </div>
                    <MultiFileDropzone
                      value={agentLogoFile}
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("agentLogoUrl");
                        setAgentLogoFile;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setAgentLogoFile([...agentLogoFile, ...addedFiles]);
                      }}
                      disabled={
                        applicationFound.statusAgentLogoUrl === "approved"
                      }
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            agentLogoFile.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.agentLogoUrl,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForAgentLogo(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForAgentLogo(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("agentLogoUrl", res.url);
                              } catch (err) {
                                updateFileProgressForAgentLogo(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !agentLogoFile.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusAgentLogoUrl === "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.agentLogoRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="profileUrl"
                        className="text-xl text-customColor font-normal"
                      >
                        Photo of Applicant
                      </Label>
                      {applicationFound.statusProfileUrl === "rejected" && (
                        <p className="text-red-600">REJECTED</p>
                      )}
                    </div>
                    <MultiFileDropzone
                      value={profileFile}
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("profileUrl");
                        setProfileFile;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setProfileFile([...profileFile, ...addedFiles]);
                      }}
                      disabled={
                        applicationFound.statusProfileUrl === "approved"
                      }
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            profileFile.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.profileUrl,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForProfile(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForProfile(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("profileUrl", res.url);
                              } catch (err) {
                                updateFileProgressForProfile(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !profileFile.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusProfileUrl === "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.profilePictureRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="nationalIdUrls"
                        className="text-xl text-customColor font-normal"
                      >
                        National Id (Back & Front)
                      </Label>
                      {applicationFound.statusNationalIdUrl === "rejected" && (
                        <p className="text-red-600">REJECTED</p>
                      )}
                    </div>
                    <MultiFileDropzone
                      value={natioanalIdFiles}
                      disabled={
                        applicationFound.statusNationalIdUrl === "approved"
                      }
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("nationalIdUrls");
                        setNationalIdFiles;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setNationalIdFiles([
                          ...natioanalIdFiles,
                          ...addedFiles,
                        ]);
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            natioanalIdFiles.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.nationalIdUrls,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForNationalId(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForNationalId(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("nationalIdUrls", res.url);
                              } catch (err) {
                                updateFileProgressForNationalId(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !natioanalIdFiles.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusNationalIdUrl === "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.nationalIdRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-fit">
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="medicalUrls"
                        className="text-xl text-customColor font-normal"
                      >
                        Medical Certificate
                      </Label>
                      {applicationFound.statusMedicalUrl === "rejected" && (
                        <p className="text-red-600">REJECTED</p>
                      )}
                    </div>
                    <MultiFileDropzone
                      value={medicalFiles}
                      disabled={
                        applicationFound.statusMedicalUrl === "approved"
                      }
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("medicalUrls");
                        setMedicalFiles;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setMedicalFiles([...medicalFiles, ...addedFiles]);
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            medicalFiles.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.medicalUrls,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForMedical(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForMedical(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("medicalUrls", res.url);
                              } catch (err) {
                                updateFileProgressForMedical(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !medicalFiles.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusMedicalUrl === "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.medicalFilesRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="educationalUrls"
                        className="text-xl text-customColor font-normal"
                      >
                        Educational Certificates
                      </Label>
                      {applicationFound.statusEducationalUrl === "rejected" && (
                        <p className="text-red-600">REJECTED</p>
                      )}
                    </div>
                    <MultiFileDropzone
                      value={educationalFile}
                      disabled={
                        applicationFound.statusEducationalUrl === "approved"
                      }
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("educationalUrls");
                        setEducationalFile;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setEducationalFile([...educationalFile, ...addedFiles]);
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            educationalFile.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.educationalUrls,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForEducational(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForEducational(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("educationalUrls", res.url);
                              } catch (err) {
                                updateFileProgressForEducational(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !educationalFile.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusEducationalUrl === "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.educationalFilesRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="uniformDetailsUrls"
                        className="text-xl text-customColor font-normal"
                      >
                        Uniform Details (Front & Back)
                      </Label>
                      {applicationFound.statusUniformDetailUrl ===
                        "rejected" && <p className="text-red-600">REJECTED</p>}
                    </div>
                    <MultiFileDropzone
                      value={uniformDetailsFile}
                      disabled={
                        applicationFound.statusUniformDetailUrl === "approved"
                      }
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("uniformDetailsUrls");
                        setUniformDetailsFile;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setUniformDetailsFile([
                          ...uniformDetailsFile,
                          ...addedFiles,
                        ]);
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        type="button"
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            uniformDetailsFile.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.uniformDetailsUrls,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForUniform(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForUniform(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("uniformDetailsUrls", res.url);
                              } catch (err) {
                                updateFileProgressForUniform(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !uniformDetailsFile.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusUniformDetailUrl ===
                        "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.uniformDetailRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-fit">
                  <div className="py-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="employeeIdUrls"
                        className="text-xl text-customColor font-normal"
                      >
                        Employee Id (Front & Back)
                      </Label>
                      {applicationFound.statusEmployeeIdUrl === "rejected" && (
                        <p className="text-red-600">REJECTED</p>
                      )}
                    </div>
                    <MultiFileDropzone
                      value={employeeIdFile}
                      disabled={
                        applicationFound.statusEmployeeIdUrl === "approved"
                      }
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={() => {
                        handleInputChange("employeeIdUrls");
                        setEmployeeIdFile;
                      }}
                      onFilesAdded={async (addedFiles) => {
                        setEmployeeIdFile([...employeeIdFile, ...addedFiles]);
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <UploadButton
                        type="button"
                        className="mt-2"
                        onClick={async () => {
                          await Promise.all(
                            employeeIdFile.map(async (fileState) => {
                              try {
                                if (
                                  fileState.progress !== "PENDING" ||
                                  typeof fileState.file === "string"
                                ) {
                                  return;
                                }
                                const res =
                                  await edgestore.myPublicFiles.upload({
                                    file: fileState.file,
                                    options: {
                                      replaceTargetUrl:
                                        applicationFound.employeeIdUrls,
                                    },
                                    onProgressChange: async (progress) => {
                                      updateFileProgressForEmployee(
                                        fileState.key,
                                        progress
                                      );
                                      if (progress === 100) {
                                        // wait 1 second to set it to complete
                                        // so that the user can see the progress bar
                                        await new Promise((resolve) =>
                                          setTimeout(resolve, 1000)
                                        );
                                        updateFileProgressForEmployee(
                                          fileState.key,
                                          "COMPLETE"
                                        );
                                      }
                                    },
                                  });
                                setValue("employeeIdUrls", res.url);
                              } catch (err) {
                                updateFileProgressForEmployee(
                                  fileState.key,
                                  "ERROR"
                                );
                              }
                            })
                          );
                        }}
                        disabled={
                          !employeeIdFile.filter(
                            (fileState) => fileState.progress === "PENDING"
                          ).length
                        }
                      >
                        Upload
                      </UploadButton>
                      {applicationFound.statusEmployeeIdUrl === "rejected" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"sm"}
                              className="py-5"
                            >
                              Rejection reason
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Rejection reason</DialogTitle>
                              <DialogDescription>
                                Kindly review the grounds for rejection and make
                                necessary adjustments before reapplying.
                              </DialogDescription>
                            </DialogHeader>
                            {applicationFound.employeeIdRejectionReason}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "disabled:cursor-not-allowed w-1/4 text-lg mt-6",
                    })}
                    disabled={isLoading}
                  >
                    Processing
                    <Loader2
                      size={22}
                      className="animate-spin text-zinc-300 ml-2"
                    />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "disabled:cursor-not-allowed w-1/4 text-center text-lg mt-6 py-7 font-normal",
                    })}
                    disabled={isSuccess}
                  >
                    Apply
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-start">
          <div className="relative h-80 w-80">
            <Image fill src={"/mainImages/logo.png"} alt="LOGO" />
          </div>
          <p className="text-xl text-customColor w-1/2 text-center">
            Please refrain from submitting another application until we've had
            the chance to process the one you've already submitted.
          </p>
        </div>
      )}
    </div>
  );
};
export default ApplicationUpdate;
