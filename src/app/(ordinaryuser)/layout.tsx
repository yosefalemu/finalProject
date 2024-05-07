import MainNavBar from "@/components/MainNavBar";
import SideBar from "@/components/Sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen border-4 border-red-800">
      <div className="">
        <MainNavBar />
      </div>
      <div className="flex-grow flex">
        <div className="w-fit border-r-2 border-gray-400">
          <SideBar />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
