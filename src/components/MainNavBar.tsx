import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Notification from "./Notification";
import Link from "next/link";

const MainNavBar = () => {
  return (
    <div className="sticky bg-white h-20 top-0 z-50 inset-x-0 border-b-2 border-gray-400">
      <MaxWidthWrapper className="md:px-0">
        <div className="flex items-center justify-between w-full">
          <Link href={"/"}>
            <div className="relative h-20 w-20">
              <Image fill src={"/mainImages/logo.png"} alt="LOGOIMAGES" />
            </div>
          </Link>
          <div className="flex items-center gap-x-8">
            <Notification />
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                fill
                src={"/mainImages/profile.png"}
                alt="LOGOIMAGES"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default MainNavBar;
