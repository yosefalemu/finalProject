"use client";
import { MainSidebarComponents } from "@/config/";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface MainSidebarComponentsItemProps {
  role: string | undefined;
}
const MainSidebarComponentsItem = ({
  role,
}: MainSidebarComponentsItemProps) => {
  const router = useRouter();
  // const pathname = usePathname();
  const pathname = usePathname().split("/")[1].toLowerCase();
  console.log("PATH NAME", pathname);

  const handleLogout = () => {
    document.cookie =
      "payload-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("logged-in-user");
    localStorage.removeItem("refresh-state");
    window.location.href = "/sign-in";
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        {MainSidebarComponents.map((item, index) => (
          <div
            className={`pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-gray-200 hover:text-customColor cursor-pointer text-customColor  ${
              pathname === item.url.toLowerCase().replace(/\s/g, "")
                ? "border-l-4 border-customColorThree"
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
            <h1 className="text-2xl">{item.name}</h1>
          </div>
        ))}
      </div>
      <div
        className="pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-gray-200 cursor-pointer text-red-700 border-t-2 border-red-700"
        onClick={handleLogout}
      >
        <LogOut size={32} />
        <h1 className="text-2xl">Logout</h1>
      </div>
    </div>
  );
};
export default MainSidebarComponentsItem;
