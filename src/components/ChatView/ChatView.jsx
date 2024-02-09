// Individual chat box interface logic

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

   <Link className="h-full w-full group" to={`/chats/${chat.chatId}`}>
  <div className={chatViewStyle}>
    <Avatar>
      <AvatarImage src={chat?.otherParticipant?.profileImage} alt="Profile"/>
      <AvatarFallback>{chat?.otherParticipant?.username[0]}</AvatarFallback>
    </Avatar>
    <div className="min-w-0 flex-auto hidden md:flex flex-col">
      <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
        {chat?.otherParticipant?.username}
      </p>
      <p className="text-gray-600 dark:text-gray-400">{messagePreview}</p>
    </div>
    {!readLatest && (
      <Badge className="h-4 w-4 md:ml-auto" variant="destructive" />
    )}
  </div>
  <Separator className="my-2 hidden md:block" />
</Link>
  )}

