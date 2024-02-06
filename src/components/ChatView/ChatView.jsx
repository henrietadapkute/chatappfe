// Individual chat box interface logic

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom'

export default function ChatView({ chat }) {
  const maxPreviewLength = 30
  const lastMessage = chat.latestMessage?.content ?
  chat.latestMessage.content : ''
  const messagePreview = lastMessage.length > maxPreviewLength 
  ? lastMessage.slice(0, maxPreviewLength) + '...'
  : lastMessage

  return (
    <Link to={`/chats/${chat.chatId}`}>
    <div>
      <div className="cursor-pointer flex min-w-0 gap-x-4">
        <Avatar className="flex-none">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {chat.otherParticipant.username}
          </p>
          <p>{messagePreview}</p>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
    </Link>
  );
}
