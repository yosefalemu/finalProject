"use client";
import { MainSidebarComponents } from "@/config/";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface MainSidebarComponentsItemProps {
  role: string | undefined;
}
const MainSidebarComponentsItem = ({
  role,
}: MainSidebarComponentsItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      {MainSidebarComponents.map((item, index) => (
        <div
          className={`  pl-2 pr-6 py-4 flex items-center gap-x-2 hover:bg-gray-400 hover:text-white cursor-pointer text-customColor ${
            pathname === "/" + item.url.toLowerCase().replace(/\s/g, "")
              ? "border-l-4 border-customColor"
              : ""
          }  ${item.role?.includes(role || "") ? "" : "hidden"}`}
          key={index}
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
export default MainSidebarComponentsItem;
