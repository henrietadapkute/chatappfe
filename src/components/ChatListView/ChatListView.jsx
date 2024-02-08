
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ChatView from "../ChatView/ChatView";
import CreateChatForm from "../CreateChatForm/CreateChatForm"
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import SheetSide from "@/components/UserProfile/UserProfile"
import { useEffect, useState } from "react";
import sendRequest from "@/utilities/send-request"
import { useChat } from "@/context/ChatContext";

// List of conversations available
export default function ChatListView({ isChatDeleted, handleChatDelete}) {

  const { user, chats, setChats, getChatPreviews, messages } = useChat()
  const [showCreateChatForm, setShowCreateChatForm] = useState(false)
  const [showProfileSheet, setShowProfileSheet] = useState(false)

  const toggleCreateChatForm = () => {
    setShowCreateChatForm(!showCreateChatForm)
  }
  const toggleProfileSheet = () => {
    setShowProfileSheet(!showProfileSheet)
   
  }

  const fetchChats = async () => {
    getChatPreviews()
  }
  
  useEffect(() => {
    fetchChats()
  }, [messages])

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-2">
      <div className="flex w-full my-3 self-start justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          <div className="bg-white dark:bg-black text-black dark:text-white">
          Messages</div>
        </h2>
        <div className="self-end flex">
          <Button className="mx-2" onClick={toggleCreateChatForm}>
            <Plus />
          </Button>
          <div className="mx-2">
            <SheetSide />
          </div>
        </div>
      </div>
          {showCreateChatForm && <CreateChatForm onSuccessfulSubmit={toggleCreateChatForm} />}
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-2 pt-1">
          

          {showProfileSheet && <SheetSide />}
          {chats.map((chat) => ( chat.chatType === "private" 
          ? <ChatView key={chat.chatId} chat={chat} />
          : <p>"Group"</p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
