import { Bell } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
const Notification = () => {
  const itemCount = 8;
  return (
    <Sheet>
      <SheetTrigger className="group flex items-center -ml-2 p-2 relative">
        <Bell className="h-6 w-6 flex-shrink-0 text-customColor group-hover:text-gray-400" />
        {itemCount > 0 && (
          <span className="h-5 w-5 flex items-center justify-center bg-customColor p-3 absolute -top-1 -right-[25%] text-xs font-medium text-white rounded-full">
            {itemCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-[600px] flex-col pr-0 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-customColor">
            {" "}
            {itemCount > 0
              ? `You have ${itemCount} new notifications`
              : "You have't notifications"}
          </SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <div>MAIN NOTIFICATION CONTENT WILL BE HERE</div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/mainImages/emptyNotification.png"
                fill
                alt="empty shopping cart hippo"
              />
            </div>
            <div className="text-xl font-semibold">
              Your Have't notifications
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Notification;
