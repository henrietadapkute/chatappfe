
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
import { useState } from "react";

// List of conversations available
export default function ChatListView() {
  const [showCreateChatForm, setShowCreateChatForm] = useState(false)

  const toggleCreateChatForm = () => {
    setShowCreateChatForm(!showCreateChatForm)
  }

  return (
    <div className="flex flex-col w-full h-full items-center justify-center p-2">
      <div className="flex w-full my-3 self-start justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Messages
        </h2>
        <div className="self-end">
          <Button className="mx-2" onClick={toggleCreateChatForm}>
            <Plus />
          </Button>
          <Button className="mx-2">
            <User />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-2 pt-1">
           {showCreateChatForm && <CreateChatForm />}
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
          <ChatView />
        </div>
      </ScrollArea>
    </div>
  );
}
