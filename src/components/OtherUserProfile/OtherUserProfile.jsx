import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import userEvent from "@testing-library/user-event"
import { useChat } from "@/context/ChatContext"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams } from "react-router-dom"

export default function DialogDemo() {
  const { chatId } = useParams()
  const { user } = useChat()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { messages, addMessage, getMessages, setMessages, chats, setCurrentChatId } = useChat()
  const [username, setUsername] = useState("")
  const currentChat = chats.find((chat) => chat.chatId === chatId)
    setCurrentChatId(chatId)

    const handleAvatarClick = () => {
        setIsDialogOpen(true)
    }

    useEffect(() => {
    if (user) {
      setUsername(user.username)
      console.log(user)
    }
  }, [user])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button onClick={handleAvatarClick} className="flex-none">
            <Avatar className="flex-none">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </button>

      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader className="text-3xl">
          <Avatar className="flex-none">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <br></br>
            {currentChat?.otherParticipant?.username}
          <DialogDescription>
              About
            <br/> "Per aspera sic itur ad astra"
          </DialogDescription>
        </DialogHeader>
      
          <div className="items-center gap-4">
              Last Message sent: <br/>
              Last online:
        </div>
        <DialogFooter>
          {/* <Button variant="outline">Outline</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="outline">Outline</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
