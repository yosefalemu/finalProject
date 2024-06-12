"use client";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TUpdateUserProfile,
  UpdateUserProfile,
} from "@/validators/update-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { MultiFileDropzone } from "@/components/MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { type FileState } from "@/components/MultiFileDropzone";
import { Button as UploadButton } from "@/components/Button";
import { toast } from "sonner";

const Profile = () => {
  const { edgestore } = useEdgeStore();
  const [profileRecords, setProfileRecords] = useState<FileState[]>([]);
  const {
    data: userProfile,
    isLoading,
    refetch,
  } = trpc.auth.getUserProfile.useQuery();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<TUpdateUserProfile>({
    resolver: zodResolver(UpdateUserProfile),
  });

  const handleInputChange = (fieldName: string) => {
    clearErrors(fieldName as keyof TUpdateUserProfile);
  };

  useEffect(() => {
    if (userProfile) {
      setValue("email", userProfile.userFound.email || "");
      setValue("phoneNumber", userProfile.userFound.phoneNumber || "");
      setValue("city", userProfile.userFound.city || "");
      setValue("woreda", userProfile.userFound.woreda || "");
      setValue("kebele", userProfile.userFound.kebele || "");
      setValue("profile", userProfile.userFound.profile || "");
    }
  }, [isLoading, userProfile,setValue]);

  const personalInformation = [
    { name: "First Name", value: userProfile?.userFound.firstName },
    { name: "Middle Name", value: userProfile?.userFound.middleName },
    { name: "Last Name", value: userProfile?.userFound.lastName },
    { name: "Phone Number", value: userProfile?.userFound.phoneNumber },
    { name: "National Id", value: userProfile?.userFound.nationalId },
    { name: "Email", value: userProfile?.userFound.email },
    { name: "Role", value: userProfile?.userFound.role },
  ];

  function updateProfileProgress(key: string, progress: FileState["progress"]) {
    setProfileRecords((fileStates) => {
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

  const { mutate, isLoading: isLoadingUpdate } =
    trpc.auth.updateProfile.useMutation({
      onSuccess: () => {
        refetch();
        toast.success("Profile updated successfully");
        setProfileRecords([]);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmit = ({
    email,
    profile,
    phoneNumber,
    city,
    woreda,
    kebele,
  }: TUpdateUserProfile) => {
    mutate({
      email,
      profile,
      phoneNumber,
      city,
      woreda,
      kebele,
    });
  };

  return (
    <MaxWidthWrapper>
      {isLoading ? (
        <div className="p-6 h-full grid grid-cols-12 gap-x-6">
          <div className="col-span-6 h-full py-8 flex flex-col items-center gap-y-14">
            <div className="flex flex-col gap-y-8 items-center w-full">
              <Skeleton className="rounded-full h-32 w-32" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
          <div className="col-span-6 h-full py-8 flex flex-col items-center gap-y-14">
            <div className="flex flex-col gap-y-8 items-center w-full">
              <Skeleton className="h-32 w-1/2" />
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
        <div className="p-6 h-full grid grid-cols-12 gap-x-6">
          <div className="col-span-6 h-full py-8 flex flex-col items-center gap-y-14">
            <div className="relative h-44 w-44 rounded-full overflow-hidden border-4 border-customColorThree">
              <Image
                fill
                src={
                  userProfile?.userFound.profile ||
                  "/mainImages/noprofile.png"
                }
                alt="PROFILEPICTURE"
                className="object-cover"
              />
            </div>
            <div className="w-full">
              <Table className="w-5/6 mx-auto">
                <TableBody>
                  {personalInformation.map((item, index) => (
                    <TableRow
                      key={item.name}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <TableCell className="font-medium text-xl text-customColor">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-lg text-customColor">
                        {item.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="col-span-6 h-full py-8 flex flex-col items-center gap-y-4">
            <h1 className="text-3xl text-customColor">Update Profile</h1>
            <div className=" w-full h-full">
              <form
                className="xl:w-5/6 mx-auto"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="py-2">
                  <Label
                    htmlFor="firstName"
                    className="text-xl text-customColor font-normal"
                  >
                    First Name
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
                      })}
                      value={userProfile?.userFound.firstName}
                      disabled={true}
                      onChange={() => handleInputChange("firstName")}
                    />
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
                      value={userProfile?.userFound.middleName}
                      disabled={true}
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
                      })}
                      onChange={() => handleInputChange("middleName")}
                    />
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
                      value={userProfile?.userFound.lastName}
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
                      })}
                      disabled={true}
                      onChange={() => handleInputChange("lastName")}
                    />
                  </div>
                </div>
                <div className="py-2">
                  <Label
                    htmlFor="email"
                    className="text-xl text-customColor font-normal"
                  >
                    Email
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("email")}
                      placeholder={userProfile?.userFound.email}
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
                      })}
                      onChange={() => handleInputChange("email")}
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
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
                      placeholder="000-000-0000-0000"
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
                      })}
                      value={userProfile?.userFound.nationalId}
                      disabled={true}
                    />
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
                      placeholder={userProfile?.userFound.phoneNumber}
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
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
                <div className="py-2">
                  <Label
                    htmlFor="city"
                    className="text-xl text-customColor font-normal"
                  >
                    City
                  </Label>
                  <div className="gap-1 py-2">
                    <Input
                      {...register("city")}
                      placeholder={userProfile?.userFound.city}
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
                      })}
                      onChange={() => handleInputChange("city")}
                    />
                    {errors?.city && (
                      <p className="text-sm text-red-500 mt-2">
                        {errors.city.message}
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
                      placeholder={userProfile?.userFound.woreda}
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
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
                      placeholder={userProfile?.userFound.kebele}
                      type="text"
                      className={cn("focus-visible:ring-customColor", {
                        "focus-visible:ring-red-600": false,
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
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="profileRecordsUrls"
                      className="text-xl text-customColor font-normal"
                    >
                      Profile picture
                    </Label>
                  </div>
                  <div className="flex flex-col items-center mt-4">
                    <MultiFileDropzone
                      value={profileRecords}
                      dropzoneOptions={{
                        maxFiles: 1,
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                      onChange={setProfileRecords}
                      onFilesAdded={async (addedFiles) => {
                        setProfileRecords([...profileRecords, ...addedFiles]);
                      }}
                    />
                    <UploadButton
                      className="mt-2"
                      type="button"
                      onClick={async () => {
                        await Promise.all(
                          profileRecords.map(async (fileState) => {
                            try {
                              if (fileState.progress !== "PENDING") return;
                              const res = await edgestore.myPublicFiles.upload({
                                file: fileState.file,
                                onProgressChange: async (progress) => {
                                  updateProfileProgress(
                                    fileState.key,
                                    progress
                                  );
                                  if (progress === 100) {
                                    // wait 1 second to set it to complete
                                    // so that the user can see the progress bar
                                    await new Promise((resolve) =>
                                      setTimeout(resolve, 1000)
                                    );
                                    updateProfileProgress(
                                      fileState.key,
                                      "COMPLETE"
                                    );
                                  }
                                },
                              });
                              setValue("profile", res.url);
                            } catch (err) {
                              updateProfileProgress(fileState.key, "ERROR");
                            }
                          })
                        );
                      }}
                      disabled={
                        !profileRecords.filter(
                          (fileState) => fileState.progress === "PENDING"
                        ).length
                      }
                    >
                      Upload
                    </UploadButton>
                  </div>
                </div>

                {isLoadingUpdate ? (
                  <Button
                    className={buttonVariants({
                      size: "lg",
                      className:
                        "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                    })}
                    disabled={isLoadingUpdate}
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
                  >
                    Update
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};
export default Profile;
