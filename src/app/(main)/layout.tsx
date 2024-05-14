import MainNavBar from "@/components/MainNavBar";
import MainSideBar from "@/components/MainSIdebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <MainNavBar />
      </div>
      <div className="flex-grow flex mt-[100px]">
        <div className="w-fit border-r-2 border-gray-400">
          <MainSideBar />
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
