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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom'
import { useChat } from "@/context/ChatContext";

export default function ChatView({ chat }) {
  const { user, currentChatId } = useChat()
  const maxPreviewLength = 30
  const lastMessage = chat.latestMessage ? chat.latestMessage.content : ''
  const messagePreview = lastMessage.length > maxPreviewLength 
  ? lastMessage.slice(0, maxPreviewLength) + '...'
  : lastMessage
  let readLatest = true
  if (chat.latestMessage) readLatest = chat.latestMessage.senderId === user._id || chat.latestMessage?.readBy.includes(user._id)

  let chatViewStyle = "box-border border-2 border-transparent cursor-pointer h-full w-full flex min-w-0 gap-x-4"
  if(currentChatId === chat.chatId) chatViewStyle += " border-r-sky-500"

  return (
    <Link className="h-full w-full" to={`/chats/${chat.chatId}`}>
      <div className={chatViewStyle}>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {chat?.otherParticipant?.username}
          </p>
          <p>{messagePreview}</p>
        </div>
          {!readLatest && <Badge className="h-4 w-4" variant="destructive"></Badge>}
      </div>
      <Separator className="my-2" />
    </Link>
  );
}
