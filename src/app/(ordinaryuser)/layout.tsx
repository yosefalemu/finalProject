import MainNavBar from "@/components/MainNavBar";
import SideBar from "@/components/Sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen max-w-screen overflow-hidden">
      <div className="">
        <MainNavBar />
      </div>
      <div className="flex-grow flex mt-[110px]">
        <div className="w-fit border-r-2 border-customColorThree">
          <SideBar />
        </div>
        <div className="flex-grow pl-72">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
