import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import MainSidebarComponentsItem from "./MainSidebarComponent";
import { LogOut } from "lucide-react";

const MainSideBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("LOGGED IN USER IN SIDEBAR", user);

  return (
    <div className="bg-customColor h-full">
      <div className="h-full">
        <MainSidebarComponentsItem role={user?.role} />
      </div>
    </div>
  );
};
export default MainSideBar;
