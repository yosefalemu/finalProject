import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import { useForm } from "react-hook-form";
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone";
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

const ApplicationMain = () => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { userId } = useUser();

  //STATE MANAGENMNET FOR THE AGENT LOGO
  const [agentLogoFile, setAgentLogoFile] = useState<FileState[]>([]);
  const [agentLogoUrl, setAgentLogoUrl] = useState<{ url: string }[]>([]);

  //STATE MANAGENMENT FOR THE PROFILE PICTURE
  const [profileFile, setProfileFile] = useState<FileState[]>([]);
  const [profileUrl, setProfileUrl] = useState<{ url: string }[]>([]);

  //STATE MANAGNMENT FOR THE NATIONAL ID
  const [natioanalIdFiles, setNationalIdFiles] = useState<FileState[]>([]);
  const [nationalIdUrls, setNationalIdUrls] = useState<{ url: string }[]>([]);

  //STATE MANAGNMENT FOR THE MEDICAL FILES
  const [medicalFiles, setMedicalFiles] = useState<FileState[]>([]);
  const [medicalUrls, setMedicalUrls] = useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE FOOTPRINT
  const [footPrintFile, setFootPrintFile] = useState<FileState[]>([]);
  const [footPrintUrl, setFootPrintUrl] = useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE JOB EXPERIENCES DETAILS
  const [jobExperienceFile, setJobExperienceFile] = useState<FileState[]>([]);
  const [jobExperienceUrls, setJobExperienceUrls] = useState<{ url: string }[]>(
    []
  );
  //STATE MANAGNMENT FOR THE EDUCATION CERTEFICATES
  const [educationalFile, setEducationalFile] = useState<FileState[]>([]);
  const [educationalUrls, setEducationalUrls] = useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE TRADE PERMISSION
  const [tradePermissionFile, setTradePermissionFile] = useState<FileState[]>(
    []
  );
  const [tradePermissionUrl, setTradePermissionUrl] = useState<
    { url: string }[]
  >([]);
  //STATE MANAGNMENT FOR EMPLOYEE QUALIFICATION ASSURANCE
  const [empQualificationAssuranceFile, setEmpQualificationAssuranceFile] =
    useState<FileState[]>([]);
  const [empQualificationAssuranceUrls, setEmpQualificationAssuranceUrls] =
    useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE STRUCTURE OF AGENCY
  const [structureOfAgencyFile, setStructureOfAgencyFile] = useState<
    FileState[]
  >([]);
  const [structureOfAgencyUrls, setStructureOfAgencyUrls] = useState<
    { url: string }[]
  >([]);
  //STATE MANAGNMENT FOR THE RULES AND REGULATIONS
  const [rulesFile, setRulesFile] = useState<FileState[]>([]);
  const [rulesUrls, setRulesUrls] = useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE FORM REGISTRATION
  const [formRegistrationFile, setFormRegistrationFile] = useState<FileState[]>(
    []
  );
  const [formRegistrationUrls, setFormRegistrationUrls] = useState<
    { url: string }[]
  >([]);
  //STATE MANAGNMENT FOR THE WARRANTY
  const [warrantyFile, setWarrantyFile] = useState<FileState[]>([]);
  const [warrantyUrls, setWarrantyUrls] = useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE BANK STATMENT
  const [bankStatementFile, setBankStatementFile] = useState<FileState[]>([]);
  const [bankStatementUrls, setBankStatementUrls] = useState<{ url: string }[]>(
    []
  );
  //STATE MANAGNMENT FOR THE HOUSE RENT PAYMNET
  const [houseRentFile, setHouseRentFile] = useState<FileState[]>([]);
  const [houseRentUrls, setHouseRentUrls] = useState<{ url: string }[]>([]);
  //STATE MANAGNMENT FOR THE UNIFORM DETAILS
  const [uniformDetailsFile, setUniformDetailsFile] = useState<FileState[]>([]);
  const [uniformDetailsUrls, setUniformDetailsUrls] = useState<
    { url: string }[]
  >([]);
  //STATE MANAGNMENT FOR THE EMPLOYEE ID
  const [employeeIdFile, setEmployeeIdFile] = useState<FileState[]>([]);
  const [employeeIdUrls, setEmployeeIdUrls] = useState<{ url: string }[]>([]);

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

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TApplicationValidator>({
    resolver: zodResolver(ApplicationValidators),
  });

  const handleInputChange = (fieldName: string) => {
    clearErrors(fieldName as keyof TApplicationValidator);
  };
  const { isLoading, mutate, isSuccess } =
    trpc.application.createApplication.useMutation({
      onError: (err: any) => {
        console.log("ERROR OCCURED");
        toast.error(err.message);
      },
      onSuccess: () => {
        console.log("SUCCESS");
        toast.success("Application is successfully");
        const timeOut = setTimeout(() => {
          router.push("/success-application");
        }, 4000);
        clearTimeout(timeOut);
      },
    });
  useEffect(() => {
    setValue("applier", userId);
    if (agentLogoUrl.length > 0) {
      setValue("agentLogoUrl", agentLogoUrl);
    }
    if (profileUrl.length > 0) {
      setValue("profileUrl", profileUrl);
    }
    if (nationalIdUrls.length > 0) {
      setValue("nationalIdUrls", nationalIdUrls);
    }
    if (medicalUrls.length > 0) {
      setValue("medicalUrls", medicalUrls);
    }
    if (educationalUrls.length > 0) {
      setValue("educationalUrls", educationalUrls);
    }
    if (uniformDetailsUrls.length > 0) {
      setValue("uniformDetailsUrls", uniformDetailsUrls);
    }
    if (employeeIdUrls.length > 0) {
      setValue("employeeIdUrls", employeeIdUrls);
    }
  }, [
    agentLogoUrl,
    profileUrl,
    nationalIdUrls,
    medicalUrls,
    educationalUrls,
    uniformDetailsUrls,
    employeeIdUrls,
    setValue,
  ]);
  const onSubmit = (data: TApplicationValidator) => {
    const {
      agentLogoUrl,
      profileUrl,
      nationalIdUrls,
      medicalUrls,
      educationalUrls,
      uniformDetailsUrls,
      employeeIdUrls,
    } = data;
    if (agentLogoUrl.length === 0) {
      toast.error("Agent logo is required");
      return;
    }
    if (!profileUrl) {
      toast.error("Profile is required");
      return;
    }
    if (!natioanalIdFiles) {
      toast.error("National id is required");
      return;
    } else if (nationalIdUrls.length < 2) {
      toast.error("Please upload both the front and back of National Id");
      return;
    }
    if (!medicalUrls) {
      toast.error("Medical files required");
      return;
    }
    if (!educationalUrls) {
      toast.error("Educational file is required");
      return;
    }
    if (!uniformDetailsUrls) {
      toast.error("Uniform image is required");
      return;
    } else if (uniformDetailsUrls.length < 2) {
      toast.error("Both the front and back of the uniform is required");
      return;
    }
    if (!employeeIdUrls) {
      toast.error("Employee Id is required");
    } else if (employeeIdUrls.length < 2) {
      toast.error("Both the front and back of the employee id is required");
      return;
    }
    setValue("agentLogoUrl", agentLogoUrl);
    setValue("profileUrl", profileUrl);
    setValue("nationalIdUrls", nationalIdUrls);
    setValue("medicalUrls", medicalUrls);
    setValue("educationalUrls", educationalUrls);
    setValue("uniformDetailsUrls", uniformDetailsUrls);
    setValue("employeeIdUrls", employeeIdUrls);
    mutate({
      ...data,
      agentLogoUrl,
      profileUrl,
      nationalIdUrls,
      medicalUrls,
      educationalUrls,
      uniformDetailsUrls,
      employeeIdUrls,
    });
  };
  const allFields = watch(); // This will give you the current value of all fields
  console.log("ALL WATCHES", allFields);
  return (
    <div className="p-6 h-[845px] w-full overflow-y-scroll">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl">Apply page</h1>
        </div>
        <div className="">
          <div className="flex justify-center">
            <div className="w-5/6 sm:w-2/3 lg:1/2 xl:w-1/3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <Label
                    htmlFor="email"
                    className="text-xl text-customColor font-normal"
                  >
                    Agent Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("agentName")}
                      placeholder="Jossy Tibek"
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
                    htmlFor="email"
                    className="text-xl text-customColor font-normal"
                  >
                    Age
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("age")}
                      placeholder="23"
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
                  <Label htmlFor="country" className="text-md">
                    Sex
                  </Label>

                  <Input
                    {...register("sex")}
                    placeholder="Select your gender"
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
                    htmlFor="email"
                    className="text-xl text-customColor font-normal"
                  >
                    House Number
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("houseNumber")}
                      placeholder="1979"
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
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Agent Logo
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Upload only one image
                    </span>
                  </div>
                  <MultiImageDropzone
                    value={agentLogoFile}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setAgentLogoFile}
                    onFilesAdded={async (addedFiles) => {
                      setAgentLogoFile([...agentLogoFile, ...addedFiles]);
                    }}
                  />
                  {errors?.agentLogoUrl && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.agentLogoUrl.message}
                    </p>
                  )}
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setAgentLogoUrl((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("agentLogoUrl", agentLogoUrl);
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
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Photo of Applicant
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Upload only one image
                    </span>
                  </div>
                  <MultiImageDropzone
                    value={profileFile}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setProfileFile}
                    onFilesAdded={async (addedFiles) => {
                      setProfileFile([...profileFile, ...addedFiles]);
                    }}
                  />
                  <Button
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setProfileUrl((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("profileUrl", profileUrl);
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
                  </Button>
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      National Id (Front and back)
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Upload only two images
                    </span>
                  </div>
                  <MultiImageDropzone
                    value={natioanalIdFiles}
                    dropzoneOptions={{
                      maxFiles: 2,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setNationalIdFiles}
                    onFilesAdded={async (addedFiles) => {
                      setNationalIdFiles([...natioanalIdFiles, ...addedFiles]);
                    }}
                  />
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setNationalIdUrls((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("nationalIdUrls", nationalIdUrls);
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
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Medical Certificate{" "}
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Can upload multiple images
                    </span>
                  </div>

                  <MultiImageDropzone
                    value={medicalFiles}
                    dropzoneOptions={{
                      maxFiles: 6,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setMedicalFiles}
                    onFilesAdded={async (addedFiles) => {
                      setMedicalFiles([...medicalFiles, ...addedFiles]);
                    }}
                  />
                  <Button
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setMedicalUrls((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("medicalUrls", medicalUrls);
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
                  </Button>
                </div>

                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Educational Certificates
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Can upload multiple images
                    </span>
                  </div>
                  <MultiImageDropzone
                    value={educationalFile}
                    dropzoneOptions={{
                      maxFiles: 6,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setEducationalFile}
                    onFilesAdded={async (addedFiles) => {
                      setEducationalFile([...educationalFile, ...addedFiles]);
                    }}
                  />
                  <Button
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setEducationalUrls((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("educationalUrls", educationalUrls);
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
                  </Button>
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Uniform Details (Front & Back)
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Upload only two images
                    </span>
                  </div>
                  <MultiImageDropzone
                    value={uniformDetailsFile}
                    dropzoneOptions={{
                      maxFiles: 2,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setUniformDetailsFile}
                    onFilesAdded={async (addedFiles) => {
                      setUniformDetailsFile([
                        ...uniformDetailsFile,
                        ...addedFiles,
                      ]);
                    }}
                  />
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setUniformDetailsUrls((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("uniformDetailsUrls", uniformDetailsUrls);
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
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Employee Id(Front & Back)
                    </Label>
                    <span className="text-gray-500 text-sm font-extralight text-right">
                      *Upload only two images
                    </span>
                  </div>
                  <MultiImageDropzone
                    value={employeeIdFile}
                    dropzoneOptions={{
                      maxFiles: 2,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={setEmployeeIdFile}
                    onFilesAdded={async (addedFiles) => {
                      setEmployeeIdFile([...employeeIdFile, ...addedFiles]);
                    }}
                  />
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
                            const res = await edgestore.myPublicImages.upload({
                              file: fileState.file,
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
                            setEmployeeIdUrls((prev) => [
                              ...prev,
                              {
                                url: res.url,
                              },
                            ]);
                            setValue("employeeIdUrls", employeeIdUrls);
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
                </div>

                {isLoading ? (
                  <Button
                    type="submit"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "disabled:cursor-not-allowed w-full text-lg mt-6",
                    })}
                    disabled={isLoading}
                  >
                    Processing
                    <Loader2
                      size={22}
                      className="animate-spin text-zinc-300 ml-2"
                    />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                    })}
                    disabled={isSuccess}
                  >
                    Apply
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplicationMain;
