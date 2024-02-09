
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
          <div className="min-w-0 flex-auto hidden md:flex flex-col">
        <img src={`${process.env.PUBLIC_URL}/chat.png`} alt="Logo" width={40} padding={50} />Messages        </div>
          </div>
        </h2>
        <div className="self-end flex">
<div className="flex flex-col sm:flex-row justify-center items-center gap-2">
  <button
    className="flex justify-center items-center mx-2 w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    onClick={toggleCreateChatForm}
  >
    <Plus />
  </button>
  <SheetSide />
</div>
      </div></div>
          {/* {showCreateChatForm && <CreateChatForm onSuccessfulSubmit={toggleCreateChatForm} />} */}
          <CreateChatForm 
  onSuccessfulSubmit={toggleCreateChatForm} 
  show={showCreateChatForm} 
  onClose={() => setShowCreateChatForm(false)} />

      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-2 pt-1">
          
          {showProfileSheet && <SheetSide />}
          {chats.map((chat) => (
          <ChatView key={chat.chatId} chat={chat} />
          )
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
