
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatView from "../ChatView/ChatView";
import CreateChatForm from "../CreateChatForm/CreateChatForm"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SheetSide from "@/components/UserProfile/UserProfile"
import { useEffect, useState } from "react";
import { useChat } from "@/context/ChatContext";

// List of conversations available
export default function ChatListView() {

  const { chats, getChatPreviews, messages } = useChat()
  const [showCreateChatForm, setShowCreateChatForm] = useState(false)

  const toggleCreateChatForm = () => {
    setShowCreateChatForm(!showCreateChatForm)
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
        
          <div className="hidden md:flex text-black dark:text-white">
          <div className="min-w-0 flex-auto hidden md:flex flex-col">
        <img src={`${process.env.PUBLIC_URL}/chat.png`} alt="Logo" width={40} padding={50} />
        <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900">
        Messages</h2></div>
          </div>

        
        <div className="self-end flex">
<div className="flex flex-col sm:flex-row md:mx-3 justify-center sm:items-start md:items-center gap-2">
  <Button
    onClick={toggleCreateChatForm}
  >
    <Plus />
  </Button>
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
          {chats.map((chat) => (
          <ChatView key={chat.chatId} chat={chat} />
          )
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
