import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import { useForm } from "react-hook-form";
import { type FileState } from "@/components/MultiFileDropzone";
import {
  ApplicationValidators,
  TApplicationValidator,
} from "@/validators/application-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { Button as UploadButton } from "@/components/Button";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/user";
import { MultiFileDropzone } from "./MultiFileDropzone";
import { toast } from "sonner";

const ApplicationMain = () => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const { userId } = useUser();
  const [errorToDisplay, setErrorToDisplay] = useState<string | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (errorToDisplay) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = window.setTimeout(() => {
        setErrorToDisplay(null);
        errorTimeoutRef.current = null;
      }, 4000);
    }

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [errorToDisplay]);
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
    clearErrors(fieldName as keyof TApplicationValidator);
  };
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

  useEffect(() => {
    if (userId) {
      setValue("applier", userId);
    }
  }, [userId, setValue]);

  const { isLoading, mutate, isSuccess } =
    trpc.application.createApplication.useMutation({
      onError: (err: any) => {
        setErrorToDisplay(err.message);
      },
      onSuccess: () => {
        toast.success("Application is successfully");
        router.push("/success-application");
        router.refresh();
      },
    });
  const onSubmit = (data: TApplicationValidator) => {
    const {
      age,
      agentName,
      applier,
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
      age,
      agentName,
      applier,
      houseNumber,
      sex,
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
    <div className="py-14 h-full">
      <div className="mx-auto h-full flex flex-col justify-between">
        <div className="text-center">
          <h1 className="text-3xl">Apply page</h1>
        </div>
        <div className="flex-1 flex justify-center w-full pt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-between"
          >
            <div className="flex items-start  justify-center gap-x-10">
              <div className="w-fit">
                {errorToDisplay && (
                  <p className="text-sm bg-red-600 text-white px-2 py-3 rounded-tr-md rounded-tl-sm error-border">
                    {errorToDisplay}
                  </p>
                )}
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
              </div>
              <div className="w-fit">
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Agent Logo
                    </Label>
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
                  />
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.agentLogoUrl && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.agentLogoUrl.message}
                    </p>
                  )}
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Photo of Applicant
                    </Label>
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
                  />
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.profileUrl && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.profileUrl.message}
                    </p>
                  )}
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      National Id (Front and back)
                    </Label>
                  </div>
                  <MultiFileDropzone
                    value={natioanalIdFiles}
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 1024 * 1024 * 1, // 1 MB
                    }}
                    onChange={() => {
                      handleInputChange("nationalIdUrls");
                      setNationalIdFiles;
                    }}
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.nationalIdUrls && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.nationalIdUrls.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-fit">
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Medical Certificate{" "}
                    </Label>
                  </div>
                  <MultiFileDropzone
                    value={medicalFiles}
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.medicalUrls && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.medicalUrls.message}
                    </p>
                  )}
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Educational Certificates
                    </Label>
                  </div>
                  <MultiFileDropzone
                    value={educationalFile}
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.educationalUrls && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.educationalUrls.message}
                    </p>
                  )}
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Uniform Details (Front & Back)
                    </Label>
                  </div>
                  <MultiFileDropzone
                    value={uniformDetailsFile}
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.uniformDetailsUrls && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.uniformDetailsUrls.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-fit">
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="email"
                      className="text-xl text-customColor font-normal"
                    >
                      Employee Id(Front & Back)
                    </Label>
                  </div>
                  <MultiFileDropzone
                    value={employeeIdFile}
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
                            const res = await edgestore.myPublicFiles.upload({
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
                  {errors?.employeeIdUrls && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.employeeIdUrls.message}
                    </p>
                  )}
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
                      "disabled:cursor-not-allowed w-1/4 text-center text-lg mt-6 py-7 font-normal",
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
    </div>
  );
};
export default ApplicationMain;
