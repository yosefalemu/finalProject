"use client";

import { trpc } from "@/trpc/client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/payload-types";

const EmployeeDetails = ({ params }: { params: { eachuser: string } }) => {
  console.log("EMPLOYEE ID", params.eachuser);

  const {
    data: SingleUser,
    isLoading,
    isError,
  } = trpc.manager.getSingleUser.useQuery({
    userId: params.eachuser,
  });
  console.log("EMPLOYEE FOUND", SingleUser);

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
            {Array.from({ length: 3 }).map((_, index) => (
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
        <div className="p-6 border h-[calc(100vh-1rem)] flex flex-col items-center justify-center gap-y-6">
          <div className="w-full h-full flex flex-col justify-between py-4 pb-32">
            <div className="flex items-end justify-between gap-x-6 h-full text-customColor">
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg items-center">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md w-full">
                  Profile Picture
                </h1>
                <div className="relative h-80 w-80 rounded-full overflow-hidden border-4 border-customColorThree">
                  <Image
                    fill
                    src={
                      SingleUser.userFound.profile ||
                      "/mainImages/noprofile.png"
                    }
                    alt="USER PICTURE"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md">
                  Basic Information
                </h1>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">First Name</h1>
                    <h1 className="flex-1">{SingleUser.userFound.firstName}</h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Middle Name</h1>
                    <h1 className="flex-1">
                      {SingleUser.userFound.middleName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Last Name</h1>
                    <h1 className="flex-1">{SingleUser.userFound.lastName}</h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">National Id</h1>
                    <h1 className="flex-1">
                      {SingleUser.userFound.nationalId}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-12 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Email</h1>
                    <h1 className="flex-1">{SingleUser.userFound.email}</h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Phone Number</h1>
                    <h1 className="flex-1">
                      {SingleUser.userFound.phoneNumber}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Sex</h1>
                    <h1 className="flex-1">{SingleUser.userFound.sex}</h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Role</h1>
                    <h1 className="flex-1">{SingleUser.userFound.role}</h1>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col gap-y-8 flex-1 rounded-lg">
                <h1 className="text-center text-2xl bg-gray-200  py-4 px-2 rounded-md">
                  Supplementary Information
                </h1>
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Date of birth</h1>
                    <h1 className="flex-1">
                      {SingleUser.userFound.dateOfBirth}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">City</h1>
                    <h1 className="flex-1">{SingleUser.userFound.city}</h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Woreda</h1>
                    <h1 className="flex-1">{SingleUser.userFound.woreda}</h1>
                  </div>
                  <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                    <h1 className="font-medium flex-1">Kebele</h1>
                    <h1 className="flex-1">{SingleUser.userFound.kebele}</h1>
                  </div>
                  {SingleUser.userFound.manager ? (
                    <>
                      <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                        <h1 className="font-medium flex-1">Manager F.name</h1>
                        <h1 className="flex-1">
                          {(SingleUser.userFound.manager as User).firstName}
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                        <h1 className="font-medium flex-1">Manager M.name</h1>
                        <h1 className="flex-1">
                          {(SingleUser.userFound.manager as User).middleName}
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                        <h1 className="font-medium flex-1">Manager L.name</h1>
                        <h1 className="flex-1">
                          {(SingleUser.userFound.manager as User).lastName}
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                        <h1 className="font-medium flex-1">Manager P.number</h1>
                        <h1 className="flex-1">
                          {(SingleUser.userFound.manager as User).phoneNumber}
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                        <h1 className="font-medium flex-1">Manager email</h1>
                        <h1 className="flex-1">
                          {(SingleUser.userFound.manager as User).email}
                        </h1>
                      </div>
                      <div className="flex items-center gap-x-6 bg-gray-200 py-4 px-4 rounded-md text-xl">
                        <h1 className="font-medium flex-1">
                          Manager national id
                        </h1>
                        <h1 className="flex-1">
                          {(SingleUser.userFound.manager as User).nationalId}
                        </h1>
                      </div>
                    </>
                  ) : null}
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
