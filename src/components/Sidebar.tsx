"use client";
import { SidebarComponents } from "@/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log("PAthname", pathname);

  return (
    <div className="bg-white h-full flex flex-col gap-y-4">
      {SidebarComponents.map((item, index) => (
        <div
          key={index}
          className={`  pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-gray-400 hover:text-white cursor-pointer text-customColor ${
            pathname === "/" + item.url.toLowerCase().replace(/\s/g, "")
              ? "border-l-4 border-customColor"
              : ""
          } `}
          onClick={() => router.push(item.url.toLowerCase().replace(/\s/g, ""))}
        >
          <div>
            <item.icon />
          </div>
          <h1 className="text-2xl">{item.name}</h1>
        </div>
      ))}
    </div>
  );
};
export default SideBar;
