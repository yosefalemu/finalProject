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

  return (
    <div
      className="bg-gray-200 flex items-center gap-x-8 p-2 rounded-sm cursor-pointer"
      onClick={() => setSelectedConversationId(conversations.id)}
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
    </div>
  );
};

export default ConversationList;
