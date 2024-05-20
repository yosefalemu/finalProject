import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import MainNavigationComponentsItem from "./MainNavigationComponent";

const MainNavigation = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("LOGGED IN USER IN SIDEBAR", user);

  return (
    <div className="">
      <MainNavigationComponentsItem role={user?.role} />
    </div>
  );
};
export default MainNavigation;
