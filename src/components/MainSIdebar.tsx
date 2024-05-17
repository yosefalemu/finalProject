import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import MainSidebarComponentsItem from "./MainSidebarComponent";
import { LogOut } from "lucide-react";

const MainSideBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("LOGGED IN USER IN SIDEBAR", user);

  return (
    <div className="h-[calc(100%_-_9rem)] bg-white w-64 fixed left-0 top-36 border-r-8 border-customColorThree">
      <MainSidebarComponentsItem role={user?.role} />
    </div>
  );
};
export default MainSideBar;
