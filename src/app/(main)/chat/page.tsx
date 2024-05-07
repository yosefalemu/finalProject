import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Search, SendHorizonal } from "lucide-react";
import Image from "next/image";

const Chat = () => {
  const isOwn = false;
  return (
    <div className="p-6 pb-1 border h-full w-full flex flex-col items-center gap-y-14">
      <div className="grid grid-cols-12 w-full gap-x-4 h-full">
        <div className="col-span-4 bg-white border border-gray-300 h-full rounded-sm py-8 px-6 flex flex-col gap-y-4 items-center">
          <h1 className="text-3xl text-customColor">Conversations</h1>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center justify-center gap-2 w-full relative">
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <Search
                  size={22}
                  className="text-gray-500 cursor-pointer"
                  strokeWidth={5}
                />
              </div>
              <Input
                placeholder="Search by user's name"
                className="py-7 px-14 rounded-lg text-lg focus-visible:ring-customColor"
              />
            </div>
            <Button className={buttonVariants({ className: "py-7 text-lg" })}>
              New chat
            </Button>
          </div>
          <div className="w-full flex flex-col gap-y-4 h-[650px]  overflow-y-scroll">
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  fill
                  src={"/mainImages/profile.png"}
                  alt="PROFILEPICTURE"
                  className="object-cover"
                />
              </div>
              <div className="flex-grow gap-y-2">
                <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-light">How are you?</p>
                  <p className="text-sm">2 min ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 bg-white border border-gray-300 h-full rounded-sm flex flex-col gap-y-4 p-2 pb-4">
          <div className="flex items-center gap-x-2  rounded-sm cursor-pointer">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                fill
                src={"/mainImages/profile.png"}
                alt="PROFILEPICTURE"
                className="object-cover"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-xl text-customColor">Solomon Asregdom</h1>
            </div>
          </div>
          <div className="h-[640px] bg-gray-200 border border-gray-200 rounded-sm overflow-y-scroll flex flex-col p-3 gap-y-3">
            <div
              className={isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={!isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  !isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={!isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  !isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={!isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  !isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={!isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  !isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
            <div
              className={isOwn ? "flex w-full justify-end" : "justify-start"}
            >
              <div
                className={`bg-white w-fit max-w-[450px] px-3 py-2  ${
                  isOwn
                    ? "rounded-br-2xl rounded-l-2xl"
                    : "rounded-bl-2xl rounded-r-2xl"
                }`}
              >
                <p className="font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  similique.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 mx-1">
            <div className="flex items-center justify-center gap-2 w-full relative">
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex items-center gap-x-5">
                <Paperclip
                  size={22}
                  className="text-gray-500 cursor-pointer"
                  strokeWidth={2}
                />
                <SendHorizonal
                  size={22}
                  className="text-gray-500 cursor-pointer"
                  strokeWidth={2}
                />
              </div>
              <Input
                placeholder="Type your message here"
                className="py-7 px-2 rounded-lg text-lg focus-visible:ring-customColor"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
