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
    <div className="bg-customColor h-full flex flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        {SidebarComponents.map((item, index) => (
          <div
            key={index}
            className={`pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-blue-900 hover:text-white cursor-pointer text-customColorThree ${
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
        className="pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-blue-900 cursor-pointer text-red-700 border-t-2 border-red-700"
        onClick={handleLogout}
      >
        <LogOut size={32} />
        <h1 className="text-2xl">Logout</h1>
      </div>
    </div>
  );
};
export default SideBar;
