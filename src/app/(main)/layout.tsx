import MainNavBar from "@/components/MainNavBar";
import MainNavigation from "@/components/MainNavigation";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed bg-white h-36 flex-col items-center top-0 z-50 inset-x-0">
        <MainNavBar />
        <MainNavigation />
      </div>
      <div className="flex-grow pt-36">{children}</div>
    </div>
  );
};
export default Layout;
