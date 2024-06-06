"use client";
import { useUser } from "@/hooks/user";
import { MainConversation, MainMessage, User } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface ConversationListProps {
  setSelectedConversationId: (conversationId: string) => void;
  conversations: MainConversation;
}

const ConversationList = ({
  conversations,
  setSelectedConversationId,
}: ConversationListProps) => {
  const { userId } = useUser();
  const userFound = conversations.members?.filter(
    (item: string | User): item is User =>
      typeof item !== "string" && item.id !== userId
  );

  // Fetch the user messages to get user's latest message
  const {
    data: userMessages,
    isLoading: isLoadingForUserMessages,
    isError: isErrorForUserMessages,
    refetch: fetchUserMessages,
  } = trpc.message.getUserMessages.useQuery(
    {
      conversationId: conversations.id,
    },
    {
      enabled: false, // Disable automatic fetching
    }
  );

  useEffect(() => {
    fetchUserMessages();
  }, [fetchUserMessages]);

  const lastMessage = userMessages?.items.sort(
    (a: MainMessage, b: MainMessage) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  // Fetch to get unviewed user messages
  const {
    data: unViwedMessagesData,
    refetch: fetchUnViewedMessages,
    isLoading: isLoadingFetchUnviewedMessages,
  } = trpc.message.getUnViewedMessage.useQuery({
    conversationId: conversations.id,
  });

  console.log("UNVIWED MESSAGES", unViwedMessagesData);

  // Update the message which is viewed
  const { mutate: updateMessageView } =
    trpc.message.updateMessageView.useMutation({
      onSuccess: () => {
        fetchUnViewedMessages();
      },
    });

  const updateMessageViewFun = () => {
    updateMessageView({ conversationId: conversations.id });
  };

  return (
    <div
      className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer relative"
      onClick={() => {
        setSelectedConversationId(conversations.id);
        updateMessageViewFun();
      }}
    >
      <div className="relative h-16 w-16 rounded-full overflow-hidden">
        <Image
          fill
          src={userFound?.[0]?.profile || "/mainImages/noprofile.png"}
          alt="PROFILEPICTURE"
          className="object-cover"
        />
      </div>
      <div className="flex-grow gap-y-2">
        <h1 className="text-xl text-customColor">{`${userFound?.[0]?.firstName} ${userFound?.[0]?.middleName} ${userFound?.[0].lastName}`}</h1>
        <div className="flex items-center justify-between">
          <p className="text-sm font-light">
            {lastMessage ? lastMessage.message : "say hi 🔥"}
          </p>
          <p className="text-sm">
            {lastMessage
              ? formatDistanceToNow(new Date(lastMessage.createdAt), {
                  addSuffix: true,
                })
              : ""}
          </p>
        </div>
      </div>
      {!isLoadingFetchUnviewedMessages ? (
        <div
          className={`flex items-center justify-center bg-red-500 rounded-full p-3 text-sm h-4 w-4 absolute top-2 right-2 ${
            unViwedMessagesData?.unviewedMessages.length === 0
              ? "hidden"
              : "block"
          }`}
        >
          <p className="text-white text-sm">
            {unViwedMessagesData?.unviewedMessages.length}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default ConversationList;
