"use client";
import { AgentComponents } from "@/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const AgentNavigation = () => {
  const router = useRouter();
  const pathname = usePathname().split("/")[1].toLowerCase();
  console.log("PATH NAME", pathname);

  return (
    <div className="flex items-center justify-center gap-x-4 bg-customColor">
      {AgentComponents.map((item, index) => (
        <div
          className={`pl-2 pr-6 py-2 flex items-center gap-x-2 hover:bg-customColorThree hover:text-customColor cursor-pointer text-customColorThree  ${
            pathname === item.url.toLowerCase().replace(/\s/g, "")
              ? "text-white font-semibold"
              : ""
          }`}
          key={index}
          onClick={() =>
            router.push(`/${item.url.toLowerCase().replace(/\s/g, "")}`)
          }
        >
          <div>
            <item.icon />
          </div>
          <h1 className="text-xl">{item.name}</h1>
        </div>
      ))}
    </div>
  );
};
export default AgentNavigation;
