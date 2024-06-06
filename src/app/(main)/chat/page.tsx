"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/client";
import { Loader2, Paperclip, Search, SendHorizonal } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConversationList from "@/components/ConvesationList";
import { useEffect, useState } from "react";
import { MainConversation, MainMessage, User } from "@/payload-types";
import { useUser } from "@/hooks/user";

const Chat = () => {
  const isOwn = false;
  const { userId } = useUser();
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | undefined
  >(undefined);
  const [userConversation, setSelectedConversation] =
    useState<MainConversation | null>(null);
  const [typedMessage, setTypedMessage] = useState<string | null>(null);

  //FETCH THE USERS THAT CAN FORM NEW CONVERSATION
  const { data: allUsers } =
    trpc.conversation.getNewUserForConversation.useInfiniteQuery({
      limit: 50,
    });
  const allUsersFound = allUsers?.pages[0].availableUsers;
  //FETCH THE USERS PREVIOUS CONVERSATIONS
  const {
    data,
    isLoading,
    isError,
    refetch: fetchUserConversation,
  } = trpc.conversation.getUserConversation.useQuery();
  const conversations = data?.items.sort(
    (a: MainConversation, b: MainConversation) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  //CREATE NEW CONVERSATION FOR THE USER
  const { mutate, isLoading: isLoadingCreateConversation } =
    trpc.conversation.createConversation.useMutation({
      onSuccess: () => {
        fetchUserConversation();
      },
    });
  const createConversation = (recieverId: string) => {
    mutate({ recieverId });
  };
  //FETCH THE MESSAGES FOR THE SELECTED CONVERSATION
  const {
    data: userMessages,
    isLoading: isLoadingForUserMessages,
    isError: isErrorForUserMessages,
    refetch: fetchUserMessages,
  } = trpc.message.getUserMessages.useQuery(
    {
      conversationId: selectedConversationId,
    },
    {
      enabled: false,
    }
  );

  //REFETCH THE USERS MESSAGES WHEN THE CONVERSATION ID CHANGE
  useEffect(() => {
    if (selectedConversationId) {
      fetchUserMessages();
      const conversation = conversations?.find(
        (item: MainConversation) => item.id === selectedConversationId
      );
      setSelectedConversation(conversation || null);
    }
  }, [selectedConversationId, fetchUserMessages, conversations]);
  const userSelectedMessages = userMessages?.items.sort(
    (a: MainMessage, b: MainMessage) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  //TO DISPLAY THE SELECTED USER CONVERSATION ON THE  TOP
  const selectedUserInfo = userConversation?.members?.filter(
    (item: string | User): item is User =>
      typeof item !== "string" && item.id !== userId
  );

  //UPDATE THE CONVERSATION WHILE THE MESSAGE IS CREATED
  const { mutate: updateConversation } =
    trpc.conversation.updateConversation.useMutation({
      onSuccess: () => {
        fetchUserConversation();
      },
    });
  const updateConversationFun = () => {
    if (selectedConversationId) {
      updateConversation({ conversationId: selectedConversationId });
    }
  };
  //CREATE MESSAGES
  const {
    mutate: createMessage,
    isLoading: isLoadingForCreateMessage,
    isError: isErrorForCreateMessage,
  } = trpc.message.createMessage.useMutation({
    onSuccess: () => {
      fetchUserMessages();
      setTypedMessage(null);
      updateConversationFun();
    },
  });
  const createMessageFun = (conversationId: string, message: string) => {
    createMessage({
      conversationId: selectedConversationId!,
      message: typedMessage!,
    });
  };

  console.log("USERMESSAGES", userMessages);
  console.log("CONVERSATION ID", selectedConversationId);
  console.log("AVAILABLE CONVERSATIONS", conversations);
  console.log("user selecte convesatio", userConversation);

  return (
    <MaxWidthWrapper>
      {isLoading ? (
        <div className="pt-6 h-full w-full flex flex-col items-center">
          <div className="grid grid-cols-12 w-full gap-x-4 h-full">
            <div className="col-span-5  h-full rounded-sm py-8 pb-0 flex flex-col gap-y-4 items-center">
              <div className="w-full">
                <Skeleton className="bg-gray-100 h-14 w-3/5 mx-auto" />
              </div>
              <div className="flex items-center gap-x-4 w-5/6">
                <Skeleton className="h-14 w-3/5 bg-gray-100" />
                <Skeleton className="h-14 w-2/5 bg-gray-100" />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
              </div>
            </div>
            <div className="col-span-7 h-full rounded-sm py-8 pb-0 flex flex-col gap-y-4 items-center">
              <div className="w-full">
                <Skeleton className="bg-gray-100 h-24 mb-9 w-full mx-auto" />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
                <Skeleton className="h-14 w-full bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-6 w-full flex flex-col items-center h-[calc(100vh-9.5rem)]">
          <div className="grid grid-cols-12 w-full gap-x-4 h-full">
            <div className="col-span-5 bg-white border border-gray-300 h-full rounded-sm py-8 pb-0 flex flex-col gap-y-4 items-center">
              <h1 className="text-3xl text-customColor">Conversations</h1>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center justify-center gap-2 w-full relative">
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <Search
                      size={22}
                      className="text-gray-500 cursor-pointer"
                      strokeWidth={5}
                    />
                  </div>
                  <Input
                    placeholder="Search by user's name"
                    className="py-7 px-14 rounded-lg text-lg focus-visible:ring-gray-400"
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={buttonVariants({ className: "py-7 text-lg" })}
                    >
                      New chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[650px] max-h-[700px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-customColor">
                        Choose a user to start chatting 🔥
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-3">
                      {allUsersFound?.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer"
                          onClick={() => createConversation(item.id)}
                        >
                          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-customColorThree">
                            <Image
                              fill
                              src={item.profile || "/mainImages/noprofile.png"}
                              alt="PROFILEPICTURE"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow gap-y-2">
                            <h1 className="text-xl text-customColor">
                              {`${item.firstName} ${item.middleName} ${item.lastName}`}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {conversations?.length === 0 ? (
                <div className="w-full h-full flex-1 flex flex-col justify-center items-center">
                  <div className="relative h-72 w-72">
                    <Image
                      fill
                      src="/mainImages/emptyNotification.png"
                      alt="NO CONVERSATION"
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-lg text-customColor">
                    create conversation and start chat!🔥
                  </h1>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-y-4 h-[630px]  overflow-y-scroll">
                  {conversations?.map((item, index) => {
                    return (
                      <ConversationList
                        conversations={item}
                        key={index}
                        setSelectedConversationId={setSelectedConversationId}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {!selectedConversationId ? (
              <div className="col-span-7 bg-white border border-gray-300 h-full rounded-sm flex flex-col justify-between p-2">
                <div className="text-customColor text-lg text-center flex items-center justify-center w-full h-full">
                  <div className="flex flex-col">
                    <h1 className="text-lg">
                      Choose a conversation to start chatting
                    </h1>
                    <div>🔥</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-span-7 border border-gray-300 h-full rounded-sm flex flex-col gap-y-2 p-2">
                <div className="flex items-center gap-x-2 rounded-sm cursor-pointer">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image
                      fill
                      src={
                        selectedUserInfo?.[0]?.profile ||
                        "/mainImages/noprofile.png"
                      }
                      alt="PROFILEPICTURE"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h1 className="text-xl text-customColor">
                      {`${selectedUserInfo?.[0]?.firstName} ${selectedUserInfo?.[0]?.middleName} ${selectedUserInfo?.[0].lastName}`}
                    </h1>
                  </div>
                </div>
                <div className="flex-1">
                  {isLoadingForUserMessages ? (
                    <div className="h-full bg-gray-100 border border-gray-200 rounded-sm flex flex-col p-3 gap-y-3">
                      <div className="w-full h-full flex items-center justify-center">
                        {" "}
                        <Loader2
                          size={44}
                          className="animate-spin text-customColor"
                        />
                      </div>
                    </div>
                  ) : isErrorForUserMessages ? (
                    <div className="h-[580px] bg-gray-100 border border-gray-200 rounded-sm overflow-y-scroll flex flex-col p-3 gap-y-3">
                      ERORR
                    </div>
                  ) : userSelectedMessages?.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-sm flex flex-col p-3 gap-y-3 h-full">
                      <div className="text-customColor text-lg text-center flex items-center justify-center w-full h-full">
                        <div className="flex flex-col">
                          <h1 className="text-lg">No conversation yet!</h1>
                          <div>🔥</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full relative">
                        <div className="absolute right-5 top-1/3 transform -translate-y-1/2 flex items-center gap-x-5">
                          <Paperclip
                            size={22}
                            className="text-gray-500 cursor-pointer"
                            strokeWidth={2}
                          />
                          {isLoadingForCreateMessage ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <Loader2
                                size={16}
                                className="animate-spin text-customColor"
                              />
                            </div>
                          ) : (
                            <SendHorizonal
                              size={22}
                              className={`text-gray-500 cursor-pointer ${
                                !typedMessage
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              strokeWidth={2}
                              aria-disabled={!typedMessage}
                              onClick={() => {
                                if (typedMessage) {
                                  createMessageFun(
                                    selectedConversationId,
                                    typedMessage
                                  );
                                }
                              }}
                            />
                          )}
                        </div>
                        <Textarea
                          placeholder="Type your message here"
                          className="py-1 px-2 rounded-lg text-lg focus-visible:ring-gray-400"
                          rows={3}
                          value={typedMessage || ""}
                          onChange={(e) => setTypedMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col justify-around">
                      <div className="h-[580px] bg-gray-100 border border-gray-200 rounded-sm overflow-y-scroll flex flex-col p-3 gap-y-3">
                        {userSelectedMessages?.map((message, index) => (
                          <div
                            key={index}
                            className={
                              (message.sender as User).id === userId
                                ? "flex w-full justify-end"
                                : "justify-start"
                            }
                          >
                            <div
                              className={`bg-white w-fit max-w-[450px] px-3 py-2 ${
                                (message.sender as User).id === userId
                                  ? "rounded-br-2xl rounded-l-2xl"
                                  : "rounded-bl-2xl rounded-r-2xl"
                              }`}
                            >
                              <p className="font-normal">{message.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-2 w-full relative">
                        <div className="absolute right-5 top-1/3 transform -translate-y-1/2 flex items-center gap-x-5">
                          <Paperclip
                            size={22}
                            className="text-gray-500 cursor-pointer"
                            strokeWidth={2}
                          />
                          {isLoadingForCreateMessage ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <Loader2
                                size={22}
                                className="animate-spin text-customColor"
                              />
                            </div>
                          ) : (
                            <SendHorizonal
                              size={22}
                              className={`text-gray-500 cursor-pointer ${
                                !typedMessage
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              strokeWidth={2}
                              aria-disabled={!typedMessage}
                              onClick={() => {
                                if (typedMessage) {
                                  createMessageFun(
                                    selectedConversationId,
                                    typedMessage
                                  );
                                }
                              }}
                            />
                          )}
                        </div>
                        <Textarea
                          placeholder="Type your message here"
                          className="py-1 px-2 rounded-lg text-lg focus-visible:ring-gray-400"
                          rows={3}
                          value={typedMessage || ""}
                          onChange={(e) => setTypedMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};
export default Chat;
