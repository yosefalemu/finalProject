"use client";
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
import { trpc } from "@/trpc/client";
import { useState } from "react";
import TimeAgo from "timeago-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { truncateText } from "@/lib/utils";
import { Application } from "@/payload-types";
import { useRouter } from "next/navigation";

const Notification = () => {
  const router = useRouter();
  const [viewedItems, setViewedItems] = useState(new Set());
  const { data: notificationsFound, refetch } =
    trpc.ordinaryNotification.getUserNotifications.useQuery();

  const { mutate } = trpc.ordinaryNotification.updateView.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const getDetailNotification = (notificationId: string) => {
    setViewedItems(viewedItems.add(notificationId));
    mutate({ notificationId });
  };

  return (
    <Sheet>
      <SheetTrigger className="group flex items-center -ml-2 p-2 relative">
        <Bell className="h-6 w-6 flex-shrink-0 text-customColor group-hover:text-customColorTwo" />
        {notificationsFound?.unseen! > 0 && (
          <span className="h-5 w-5 flex items-center justify-center bg-customColor p-3 absolute -top-1 -right-[25%] text-xs font-medium text-white rounded-full">
            {notificationsFound?.unseen!}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex w-[600px] flex-col pr-0 sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-customColor font-normal text-xl">
            {notificationsFound?.unseen! > 0
              ? `You have ${notificationsFound?.unseen} new notifications`
              : "You haven't new notifications"}
          </SheetTitle>
        </SheetHeader>
        {notificationsFound?.notification.length! > 0 ? (
          <div className="mt-2 h-full overflow-y-scroll">
            <Accordion type="single" collapsible className="w-full">
              {notificationsFound?.notification.map((item, index) => {
                const application = item.application as Application;
                return (
                  <AccordionItem
                    value={`item-${index}`}
                    className="w-full"
                    key={index}
                  >
                    <AccordionTrigger
                      className="no-underline hover:no-underline w-full"
                      onClick={() => {
                        getDetailNotification(item.id);
                      }}
                    >
                      <div className="flex items-center h-[100px] bg-gray-100 gap-x-2 pr-4 rounded-sm py-2 w-full">
                        <div className="relative h-24 w-24 rounded-full">
                          <Image
                            fill
                            src={"/mainImages/logo.png"}
                            alt="PROFILE PICTURE"
                            className="absolute object-contain"
                          />
                        </div>
                        <div className="flex-1 relative h-full">
                          <div className="flex items-center gap-x-2">
                            {application.responseOfScreener !== "approved" ? (
                              <h1 className="text-red-500 text-lg">
                                Rejection of application
                              </h1>
                            ) : (
                              <h1>Acceptance of application</h1>
                            )}
                          </div>

                          <p className="text-start">
                            {truncateText(item.message)}
                          </p>
                          <div className="absolute right-0 bottom-0">
                            <TimeAgo datetime={item.createdAt} />
                          </div>
                          {!viewedItems.has(item.id) &&
                            item.isViewed === "unseen" && (
                              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm rounded-sm">
                                New
                              </div>
                            )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-y-2">
                        <p className="text-lg">{item.message}</p>
                        {application.responseOfScreener === "rejected" && (
                          <Button
                            className="text-white decoration-white w-1/4"
                            variant={"default"}
                            onClick={() => {
                              router.push(`/reapply/${application.id}`);
                              router.refresh();
                            }}
                          >
                            Reapply
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
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
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-lg font-normal text-customColor">
                Oops! nothing here!
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
export default Notification;
