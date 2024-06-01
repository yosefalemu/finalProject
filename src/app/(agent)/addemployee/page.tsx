"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { MultiFileDropzone } from "@/components/MultiFileDropzone";
import { Button as UploadButton } from "@/components/Button";
import { type FileState } from "@/components/MultiFileDropzone";
import { TAddEmployee, AddEmployee } from "@/validators/add-employee";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

const AddEmployeePage = () => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [forensicRecords, setForensicRecords] = useState<FileState[]>([]);
  const [medicalExamination, setMedicalExamination] = useState<FileState[]>([]);
  const [errorToDisplay, setErrorToDisplay] = useState<string | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);

  function updateForensicProgress(
    key: string,
    progress: FileState["progress"]
  ) {
    setForensicRecords((fileStates) => {
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

  function updateMedicalProgress(key: string, progress: FileState["progress"]) {
    setMedicalExamination((fileStates) => {
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

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<TAddEmployee>({
    resolver: zodResolver(AddEmployee),
  });

  const handleInputChange = (fieldName: string) => {
    clearErrors(fieldName as keyof TAddEmployee);
  };
  const { mutate, isLoading, isSuccess } =
    trpc.employee.createEmployee.useMutation({
      onSuccess: () => {
        toast.success("EMPLOYEE CREATED");
        router.refresh();
        setForensicRecords([]);
        setMedicalExamination([]);
        setValue("firstName", "");
        setValue("middleName", "");
        setValue("lastName", "");
        setValue("sex", "");
        setValue("age", "");
        setValue("educationLevel", "");
        setValue("nationalId", "");
        setValue("phoneNumber", "");
        setValue("dateOfEmployement", "");
        setValue("forensicRecordsUrls", "");
        setValue("medicalExaminationUrls", "");
        setValue("regionofemployment", "");
        setValue("cityofemployment", "");
        setValue("specificplaceofemployment", "");
        setValue("employmentposition", "");
        setValue("region", "");
        setValue("zone", "");
        setValue("woreda", "");
        setValue("kebele", "");
        setValue("houseNumber", "");
        setValue("martialStatus", "");
        setValue("getCoughtFirstName", "");
        setValue("getCoughtMiddleName", "");
        setValue("getCoughtLastName", "");
        setValue("getCoughtRegion", "");
        setValue("getCoughtZone", "");
        setValue("getCoughtKebele", "");
        setValue("getCoughtHouseNumber", "");
        setValue("getCoughtNationalId", "");
        setValue("getCoughtPhoneNumber", "");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmit = ({
    firstName,
    middleName,
    lastName,
    sex,
    age,
    educationLevel,
    nationalId,
    phoneNumber,
    dateOfEmployement,
    forensicRecordsUrls,
    medicalExaminationUrls,
    regionofemployment,
    cityofemployment,
    specificplaceofemployment,
    employmentposition,
    region,
    zone,
    woreda,
    kebele,
    houseNumber,
    martialStatus,
    getCoughtFirstName,
    getCoughtMiddleName,
    getCoughtLastName,
    getCoughtRegion,
    getCoughtZone,
    getCoughtKebele,
    getCoughtHouseNumber,
    getCoughtNationalId,
    getCoughtPhoneNumber,
  }: TAddEmployee) => {
    mutate({
      firstName,
      middleName,
      lastName,
      sex,
      age,
      educationLevel,
      nationalId,
      phoneNumber,
      dateOfEmployement,
      forensicRecordsUrls,
      medicalExaminationUrls,
      regionofemployment,
      cityofemployment,
      specificplaceofemployment,
      employmentposition,
      region,
      zone,
      woreda,
      kebele,
      houseNumber,
      martialStatus,
      getCoughtFirstName,
      getCoughtMiddleName,
      getCoughtLastName,
      getCoughtRegion,
      getCoughtZone,
      getCoughtKebele,
      getCoughtHouseNumber,
      getCoughtNationalId,
      getCoughtPhoneNumber,
    });
  };

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

  const GenderList = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];

  const EducationLevels = [
    { name: "Grades 5-8 (Upper Primary, ages 11-14)", value: "upper_primary" },
    { name: "Secondary Education", value: "secondary_education" },
    {
      name: "Grades 9-10 (General Secondary, ages 15-16)",
      value: "general_secondary",
    },
    {
      name: "Grades 11-12 (Preparatory Secondary, ages 17-18) - preparation for university entrance",
      value: "preparatory_secondary",
    },
    { name: "Tertiary Education", value: "tertiary_education" },
    { name: "Certificate Programs (1-2 years)", value: "certificate_programs" },
    { name: "Diploma Programs (2-3 years)", value: "diploma_programs" },
    { name: "Bachelor's Degree (3-4 years)", value: "bachelors_degree" },
    {
      name: "Master's Degree (1-2 years post-Bachelor's)",
      value: "masters_degree",
    },
    {
      name: "Doctoral Degree (3-5 years post-Master's)",
      value: "doctoral_degree",
    },
  ];

  const MaritalStatusOptions = [
    { name: "Single", value: "single" },
    { name: "Married", value: "married" },
    { name: "Divorced", value: "divorced" },
  ];

  return (
    <div>
      <div className=" pt-12 flex flex-col gap-y-2 items-center py-2 pb-8">
        <div className="w-full text-center">
          <h1 className="text-3xl w-3/5 mx-auto mb-6 text-customColor">
            Please provide accurate information carefully. Any misleading or
            incorrect information may result in serious legal consequences.
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <form className="w-full sm:w-5/6" onSubmit={handleSubmit(onSubmit)}>
            {errorToDisplay && (
              <div className="w-full flex justify-start">
                <p className="text-sm bg-red-600 text-white px-2 py-3 rounded-tr-md rounded-tl-sm error-border w-1/2">
                  {errorToDisplay}
                </p>
              </div>
            )}
            <div className="flex items-start gap-x-14">
              <div className="flex-1">
                <h1 className="py-2 text-3xl text-blue-900 font-normal">
                  Basic Information
                </h1>
                <div className="py-2">
                  <Label
                    htmlFor="firstName"
                    className="text-xl text-customColor font-normal"
                  >
                    First Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("firstName")}
                      placeholder="Yosef"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.firstName,
                      })}
                      onChange={() => handleInputChange("firstName")}
                    />
                    {errors?.firstName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="middleName"
                    className="text-xl text-customColor font-normal"
                  >
                    Middle Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("middleName")}
                      placeholder="Alemu"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.middleName,
                      })}
                      onChange={() => handleInputChange("middleName")}
                    />
                    {errors?.middleName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.middleName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="lastName"
                    className="text-xl text-customColor font-normal"
                  >
                    Last Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("lastName")}
                      placeholder="Mengstie"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.lastName,
                      })}
                      onChange={() => handleInputChange("lastName")}
                    />
                    {errors?.lastName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2 py-2">
                  <Label
                    htmlFor="country"
                    className="text-xl text-customColor font-normal"
                  >
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
                    className={cn(
                      {
                        "focus-visible:ring-red-600": errors.sex,
                      },
                      "py-5"
                    )}
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
                    htmlFor="age"
                    className="text-xl text-customColor font-normal"
                  >
                    Age
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("age")}
                      placeholder="36"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.age,
                      })}
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
                  <Label
                    htmlFor="country"
                    className="text-xl text-customColor font-normal"
                  >
                    Education level
                  </Label>

                  <Input
                    {...register("educationLevel")}
                    placeholder="Select your education level"
                    list="educationLevel"
                    onChange={(e) => {
                      handleInputChange("educationLevel");
                      // handleSelectCountry(e.target.value);
                    }}
                    className={cn(
                      {
                        "focus-visible:ring-red-600": errors.educationLevel,
                      },
                      "py-5"
                    )}
                  />
                  <datalist id="educationLevel">
                    {EducationLevels.map((item: any, index: number) => (
                      <option key={index} value={item.value} />
                    ))}
                  </datalist>
                  {errors?.educationLevel && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.educationLevel.message}
                    </p>
                  )}
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="nationalId"
                    className="text-xl text-customColor font-normal"
                  >
                    National Id
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("nationalId")}
                      placeholder="000-000-0000-0000"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.nationalId,
                      })}
                      onChange={() => handleInputChange("nationalId")}
                    />
                    {errors?.nationalId && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.nationalId.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-xl text-customColor font-normal"
                  >
                    Phone Number
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("phoneNumber")}
                      placeholder="0982010318"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.phoneNumber,
                      })}
                      onChange={() => handleInputChange("phoneNumber")}
                    />
                    {errors?.phoneNumber && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="py-2 text-3xl text-blue-900 font-normal">
                  Supplementary Info
                </h1>
                <div className="py-2">
                  <Label
                    htmlFor="dateOfEmployement"
                    className="text-xl text-customColor font-normal"
                  >
                    Date of Employement
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("dateOfEmployement")}
                      placeholder="21-06-2000"
                      type="date"
                      className={cn({
                        "focus-visible:ring-red-600": errors.dateOfEmployement,
                      })}
                      onChange={() => handleInputChange("dateOfEmployement")}
                    />
                    {errors?.dateOfEmployement && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.dateOfEmployement.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="forensicRecordsUrls"
                      className="text-xl text-customColor font-normal"
                    >
                      Forensic Record
                    </Label>
                  </div>
                  <div className="flex flex-col items-start">
                    <MultiFileDropzone
                      value={forensicRecords}
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={setForensicRecords}
                      onFilesAdded={async (addedFiles) => {
                        setForensicRecords([...forensicRecords, ...addedFiles]);
                      }}
                    />
                    <UploadButton
                      className="mt-2"
                      type="button"
                      onClick={async () => {
                        await Promise.all(
                          forensicRecords.map(async (fileState) => {
                            try {
                              if (fileState.progress !== "PENDING") return;
                              const res = await edgestore.myPublicFiles.upload({
                                file: fileState.file,
                                onProgressChange: async (progress) => {
                                  updateForensicProgress(
                                    fileState.key,
                                    progress
                                  );
                                  if (progress === 100) {
                                    // wait 1 second to set it to complete
                                    // so that the user can see the progress bar
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    updateForensicProgress(
                                      fileState.key,
                                      "COMPLETE"
                                    );
                                  }
                                },
                              });
                              setValue("forensicRecordsUrls", res.url);
                            } catch (err) {
                              updateForensicProgress(fileState.key, "ERROR");
                            }
                          })
                        );
                      }}
                      disabled={
                        !forensicRecords.filter(
                          (fileState) => fileState.progress === "PENDING"
                        ).length
                      }
                    >
                      Upload
                    </UploadButton>
                  </div>
                </div>
                <div className="py-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="medicalExaminationUrls"
                      className="text-xl text-customColor font-normal"
                    >
                      Medical Examination
                    </Label>
                  </div>
                  <div className="flex flex-col items-start">
                    <MultiFileDropzone
                      value={medicalExamination}
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={setMedicalExamination}
                      onFilesAdded={async (addedFiles) => {
                        setMedicalExamination([
                          ...medicalExamination,
                          ...addedFiles,
                        ]);
                      }}
                    />
                    <UploadButton
                      className="mt-2"
                      type="button"
                      onClick={async () => {
                        await Promise.all(
                          medicalExamination.map(async (fileState) => {
                            try {
                              if (fileState.progress !== "PENDING") return;
                              const res = await edgestore.myPublicFiles.upload({
                                file: fileState.file,
                                onProgressChange: async (progress) => {
                                  updateMedicalProgress(
                                    fileState.key,
                                    progress
                                  );
                                  if (progress === 100) {
                                    // wait 1 second to set it to complete
                                    // so that the user can see the progress bar
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    updateMedicalProgress(
                                      fileState.key,
                                      "COMPLETE"
                                    );
                                  }
                                },
                              });
                              setValue("medicalExaminationUrls", res.url);
                            } catch (err) {
                              updateMedicalProgress(fileState.key, "ERROR");
                            }
                          })
                        );
                      }}
                      disabled={
                        !medicalExamination.filter(
                          (fileState) => fileState.progress === "PENDING"
                        ).length
                      }
                    >
                      Upload
                    </UploadButton>
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="regionofemployment"
                    className="text-xl text-customColor font-normal"
                  >
                    Region of employment
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("regionofemployment")}
                      placeholder="Addis Ababa"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.regionofemployment,
                      })}
                      onChange={() => handleInputChange("regionofemployment")}
                    />
                    {errors?.regionofemployment && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.regionofemployment.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="cityofemployment"
                    className="text-xl text-customColor font-normal"
                  >
                    City of employment
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("cityofemployment")}
                      placeholder="Addis Ababa"
                      className={cn({
                        "focus-visible:ring-red-600": errors.cityofemployment,
                      })}
                      onChange={() => handleInputChange("cityofemployment")}
                    />
                    {errors?.cityofemployment && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.cityofemployment.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="specificplaceofemployment"
                    className="text-xl text-customColor font-normal"
                  >
                    Specific place of employment
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("specificplaceofemployment")}
                      placeholder="Pissa"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600":
                          errors.specificplaceofemployment,
                      })}
                      onChange={() =>
                        handleInputChange("specificplaceofemployment")
                      }
                    />
                    {errors?.specificplaceofemployment && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.specificplaceofemployment.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="employmentposition"
                    className="text-xl text-customColor font-normal"
                  >
                    Employment position
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("employmentposition")}
                      placeholder="Manager"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.employmentposition,
                      })}
                      onChange={() => handleInputChange("employmentposition")}
                    />
                    {errors?.employmentposition && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.employmentposition.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="py-2 text-3xl text-blue-900 font-normal">
                  Resident form
                </h1>
                <div className="py-2">
                  <Label
                    htmlFor="region"
                    className="text-xl text-customColor font-normal"
                  >
                    Region
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("region")}
                      placeholder="Addis Ababa"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.firstName,
                      })}
                      onChange={() => handleInputChange("region")}
                    />
                    {errors?.region && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.region.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="zone"
                    className="text-xl text-customColor font-normal"
                  >
                    Zone
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("zone")}
                      placeholder="Arada"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.zone,
                      })}
                      onChange={() => handleInputChange("zone")}
                    />
                    {errors?.zone && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.zone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="woreda"
                    className="text-xl text-customColor font-normal"
                  >
                    Woreda
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("woreda")}
                      placeholder="Arada"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.woreda,
                      })}
                      onChange={() => handleInputChange("woreda")}
                    />
                    {errors?.woreda && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.woreda.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="kebele"
                    className="text-xl text-customColor font-normal"
                  >
                    Kebele
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("kebele")}
                      placeholder="08"
                      className={cn({
                        "focus-visible:ring-red-600": errors.kebele,
                      })}
                      onChange={() => handleInputChange("kebele")}
                    />
                    {errors?.kebele && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.kebele.message}
                      </p>
                    )}
                  </div>
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
                      placeholder="1749"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.houseNumber,
                      })}
                      onChange={() => handleInputChange("houseNumber")}
                    />
                    {errors?.houseNumber && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.houseNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2 py-2">
                  <Label
                    htmlFor="martialStatus"
                    className="text-xl text-customColor font-normal"
                  >
                    Martial Status
                  </Label>

                  <Input
                    {...register("martialStatus")}
                    placeholder="Select your gender"
                    list="martialStatus"
                    onChange={(e) => {
                      handleInputChange("martialStatus");
                      // handleSelectCountry(e.target.value);
                    }}
                    className={cn({
                      "focus-visible:ring-red-600": errors.martialStatus,
                    })}
                  />
                  <datalist id="martialStatus">
                    {MaritalStatusOptions.map((item: any, index: number) => (
                      <option key={index} value={item.value} />
                    ))}
                  </datalist>
                  {errors?.martialStatus && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.martialStatus.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="py-2 text-3xl text-blue-900 font-normal">
                  Get caught Info
                </h1>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtFirstName"
                    className="text-xl text-customColor font-normal"
                  >
                    First Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtFirstName")}
                      placeholder="Alemu"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.getCoughtFirstName,
                      })}
                      onChange={() => handleInputChange("getCoughtFirstName")}
                    />
                    {errors?.getCoughtFirstName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtFirstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtMiddleName"
                    className="text-xl text-customColor font-normal"
                  >
                    Middle Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtMiddleName")}
                      placeholder="Mengstie"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600":
                          errors.getCoughtMiddleName,
                      })}
                      onChange={() => handleInputChange("getCoughtMiddleName")}
                    />
                    {errors?.getCoughtMiddleName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtMiddleName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtLastName"
                    className="text-xl text-customColor font-normal"
                  >
                    Last Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtLastName")}
                      placeholder="Kelkay"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600": errors.getCoughtLastName,
                      })}
                      onChange={() => handleInputChange("getCoughtLastName")}
                    />
                    {errors?.getCoughtLastName && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtLastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtRegion"
                    className="text-xl text-customColor font-normal"
                  >
                    Region
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtRegion")}
                      placeholder="Amhara"
                      className={cn({
                        "focus-visible:ring-red-600": errors.getCoughtRegion,
                      })}
                      onChange={() => handleInputChange("getCoughtRegion")}
                    />
                    {errors?.getCoughtRegion && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtRegion.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtZone"
                    className="text-xl text-customColor font-normal"
                  >
                    Zone
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtZone")}
                      placeholder="Dessie"
                      className={cn({
                        "focus-visible:ring-red-600": errors.getCoughtZone,
                      })}
                      onChange={() => handleInputChange("getCoughtZone")}
                    />
                    {errors?.getCoughtZone && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtZone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtKebele"
                    className="text-xl text-customColor font-normal"
                  >
                    Kebele
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtKebele")}
                      placeholder="08"
                      className={cn({
                        "focus-visible:ring-red-600": errors.getCoughtKebele,
                      })}
                      onChange={() => handleInputChange("getCoughtKebele")}
                    />
                    {errors?.getCoughtKebele && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtKebele.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtHouseNumber"
                    className="text-xl text-customColor font-normal"
                  >
                    House Number
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtHouseNumber")}
                      placeholder="1749"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600":
                          errors.getCoughtHouseNumber,
                      })}
                      onChange={() => handleInputChange("getCoughtHouseNumber")}
                    />
                    {errors?.getCoughtHouseNumber && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtHouseNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtNationalId"
                    className="text-xl text-customColor font-normal"
                  >
                    National Id
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtNationalId")}
                      placeholder="0000-0000-0000-0000"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600":
                          errors.getCoughtNationalId,
                      })}
                      onChange={() => handleInputChange("getCoughtNationalId")}
                    />
                    {errors?.getCoughtNationalId && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtNationalId.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="getCoughtPhoneNumber"
                    className="text-xl text-customColor font-normal"
                  >
                    Phone Number
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("getCoughtPhoneNumber")}
                      placeholder="0982010318"
                      type="text"
                      className={cn({
                        "focus-visible:ring-red-600":
                          errors.getCoughtPhoneNumber,
                      })}
                      onChange={() => handleInputChange("getCoughtPhoneNumber")}
                    />
                    {errors?.getCoughtPhoneNumber && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.getCoughtPhoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="w-full flex justify-end">
                <Button
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "disabled:cursor-not-allowed w-1/4 text-lg mt-6 py-7 font-normal",
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
              <div className="w-full flex justify-end">
                <Button
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "disabled:cursor-not-allowed w-1/4 text-lg mt-6 py-7 font-normal",
                  })}
                  disabled={errorToDisplay ? true : false}
                >
                  Registor
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddEmployeePage;
