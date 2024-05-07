import HomeNavbar from "@/components/HomeNavbar";
import HomeSlider from "@/components/HomeSlider";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <HomeNavbar />
      <HomeSlider />
    </div>
  );
}
