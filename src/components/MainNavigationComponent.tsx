"use client";
import { MainSidebarComponents } from "@/config/";
import { trpc } from "@/trpc/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface MainSidebarComponentsItemProps {
  role: string | undefined;
}

const MainNavigationComponentsItem = ({
  role,
}: MainSidebarComponentsItemProps) => {
  const router = useRouter();
  const pathname = usePathname().split("/")[1]?.toLowerCase() || "";
  console.log("PATH NAME", pathname);

  const { data: allUnviewedMessages, refetch } =
    trpc.message.getAllUnviewedMessages.useQuery();

  console.log("ALL UNVIEWED MESSAGES", allUnviewedMessages);

  const unviewedMessagesCount =
    allUnviewedMessages?.unviewedMessages?.length || 0;

  // Refetch data every 1 minute (60,000 milliseconds)
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="flex items-center justify-center gap-x-4 bg-customColor">
      {MainSidebarComponents.map((item, index) => (
        <div
          className={`pl-2 pr-6 py-2 flex items-center gap-x-2 hover:bg-customColorThree hover:text-customColor cursor-pointer text-customColorThree relative  ${
            pathname === item.url.toLowerCase().replace(/\s/g, "")
              ? "text-white font-semibold"
              : ""
          }  ${item.role?.includes(role || "") ? "" : "hidden"}`}
          key={index}
          onClick={() =>
            router.push(`/${item.url.toLowerCase().replace(/\s/g, "")}`)
          }
        >
          <div>
            <item.icon />
          </div>
          <h1 className="text-xl">{item.name}</h1>
          {unviewedMessagesCount > 0 && (
            <p
              className={`${pathname === "chat" ? "hidden" : "block"} ${
                item.url.toLowerCase() === "chat" ? "block" : "hidden"
              } bg-red-500  rounded-full absolute top-[17px] right-2 h-2 w-2`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MainNavigationComponentsItem;
