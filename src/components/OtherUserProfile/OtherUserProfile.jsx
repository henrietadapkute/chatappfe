
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChat } from "@/context/ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";

export default function DialogDemo() {
  const { chatId } = useParams();
  const { chats, setCurrentChatId } = useChat();
  const currentChat = chats.find((chat) => chat.chatId === chatId);
  setCurrentChatId(chatId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex-none">
          <Avatar className="flex-none">
            <AvatarImage src={currentChat?.otherParticipant?.profileImage} />
            <AvatarFallback>
              {currentChat?.otherParticipant?.username[0]}
            </AvatarFallback>
          </Avatar>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader className="text-3xl">
          <Avatar className="flex-none">
            <AvatarImage src={currentChat?.otherParticipant?.profileImage} />
            <AvatarFallback>
              {currentChat?.otherParticipant?.username[0]}
            </AvatarFallback>
          </Avatar>
          <br></br>
          {currentChat?.otherParticipant?.username}
          <DialogDescription>
            About
            <br /> {currentChat?.otherParticipant?.bio || 'This user has no bio'}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
