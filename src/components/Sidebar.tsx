"use client";
import { SidebarComponents } from "@/config";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log("PAthname", pathname);

  const handleLogout = () => {
    document.cookie =
      "payload-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    localStorage.removeItem("logged-in-user");
    localStorage.removeItem("refresh-state");
    window.location.href = "/sign-in";
  };

  return (
    <div className="h-[calc(100%_-_9rem)] bg-white w-72 fixed left-0 top-36 flex flex-col justify-between border-r-8 border-customColorThree">
      <div className="flex flex-col gap-y-4">
        {SidebarComponents.map((item, index) => (
          <div
            key={index}
            className={`pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-gray-200 hover:text-customColor cursor-pointer text-customColor ${
              pathname === "/" + item.url.toLowerCase().replace(/\s/g, "")
                ? "border-l-4 border-customColorThree"
                : ""
            } `}
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
export default SideBar;
