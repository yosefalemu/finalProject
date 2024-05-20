import Image from "next/image";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Profile = () => {
  const personalInformation = [
    {
      name: "First Name",
      value: "Yosef",
    },
    {
      name: "Middle Name",
      value: "Alemu",
    },
    {
      name: "Last Name",
      value: "Mengstie",
    },
    {
      name: "Phone Number",
      value: "0982010318",
    },
    {
      name: "Natioanl Id",
      value: "1111 1111 1111 1111",
    },
    {
      name: "Email",
      value: "yosefalemu007@gmail.com",
    },
    {
      name: "Role",
      value: "Manager",
    },
  ];
  const isLoading = false;
  return (
    <MaxWidthWrapper>
      <div className="p-6 h-full grid grid-cols-12 gap-x-6">
        <div className="col-span-6 h-full py-8 flex flex-col items-center gap-y-14">
          <div className="relative h-44 w-44 rounded-full overflow-hidden">
            <Image
              fill
              src={"/mainImages/profile.png"}
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
            <form className="xl:w-5/6 mx-auto">
              <div className="py-2">
                <Label
                  htmlFor="firstName"
                  className="text-xl text-customColor font-normal"
                >
                  First Name
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    // {...register("firstName")}
                    placeholder="Yosef"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("firstName")}
                  />
                  {/* {errors?.firstName && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.firstName.message}
                </p>
              )} */}
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
                    // {...register("middleName")}
                    placeholder="Alemu"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("middletName")}
                  />
                  {/* {errors?.middleName && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.middleName.message}
                </p>
              )} */}
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
                    // {...register("lastName")}
                    placeholder="Mengstie"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("lastName")}
                  />
                  {/* {errors?.lastName && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.lastName.message}
                </p>
              )} */}
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
                    // {...register("email")}
                    placeholder="you@example.com"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("email")}
                  />
                  {/* {errors?.email && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.email.message}
                </p>
              )} */}
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
                    // {...register("nationalId")}
                    placeholder="000-000-0000-0000"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("nationalId")}
                  />
                  {/* {errors?.nationalId && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.nationalId.message}
                </p>
              )} */}
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
                    // {...register("phoneNumber")}
                    placeholder="0982010318"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("phoneNumber")}
                  />
                  {/* {errors?.phoneNumber && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.phoneNumber.message}
                </p>
              )} */}
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
                    // {...register("city")}
                    placeholder="Addis Ababa"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("city")}
                  />
                  {/* {errors?.city && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.city.message}
                </p>
              )} */}
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
                    // {...register("woreda")}
                    placeholder="Arada"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("woreda")}
                  />
                  {/* {errors?.woreda && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.woreda.message}
                </p>
              )} */}
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
                    // {...register("kebele")}
                    placeholder="08"
                    type="text"
                    className={cn("focus-visible:ring-customColor", {
                      "focus-visible:ring-red-600": false,
                    })}
                    // onChange={() => handleInputChange("kebele")}
                  />
                  {/* {errors?.kebele && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.kebele.message}
                </p>
              )} */}
                </div>
              </div>

              {isLoading ? (
                <Button
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
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                  })}
                  // disabled={isSuccess}
                >
                  Update
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Profile;
