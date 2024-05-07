import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import MainSidebarComponentsItem from "./MainSidebarComponent";

const MainSideBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("LOGGED IN USER IN SIDEBAR", user);

  return (
    <div className="bg-white h-full flex flex-col gap-y-4">
      <MainSidebarComponentsItem role={user?.role} />
    </div>
  );
};
export default MainSideBar;
