import HomeNavbar from "@/components/HomeNavbar";
import HomeSlider from "@/components/HomeSlider";

export default function Home() {
  return (
    <div className="flex flex-col  h-screen">
      <HomeNavbar />
      <div className="pt-36">
        <HomeSlider />
      </div>
    </div>
  );
}
