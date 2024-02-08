// Displays list of MessageViews()
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from "@/components/ui/input";
import { Trash2, User } from 'lucide-react';
import MessageView from "@/components/MessageView/MessageView"
import DialogDemo from "@/components/OtherUserProfile/OtherUserProfile"
import AlertOnDelete from "@/components/AlertOnDelete/AlertOnDelete"
import { useChat } from '@/context/ChatContext'
import sendRequest from "@/utilities/send-request"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// SOCKET
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

export default function MessageListView() {
    const { chatId } = useParams()
    const navigate = useNavigate()
    const { messages, addMessage, getMessages, setMessages, chats, setCurrentChatId } = useChat()
    const currentChat = chats.find((chat) => chat.chatId === chatId)
    setCurrentChatId(chatId)

    const [messageInput, setMessageInput] = useState('') 
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [error, setError] = useState()
    const [messageRecieved, setMessageRecieved] = useState('')
    const [isAlertOpen, setIsAlertOpen] = useState(false)
   
    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    const fetchMessages = () => {
        getMessages(chatId)
    }
    
    const handleChange = (evt) => {
        setMessageInput(evt.target.value)
    }

    useEffect(() => {
        joinRoom(chatId);
        return () => {
            socket.off('receive_message')
        }
    }, []);

    useEffect(() => {
        fetchMessages()
    }, [chatId])

    const joinRoom = (chatId) => {
        socket.emit("join_room", chatId)
    }
    
    const sendMessage = (evt) => {
        evt.preventDefault()
        if (!messageInput.trim()) {
            setError('Please enter a message')
            return
        }
        setError()
        socket.emit("send_message", { messageInput, chatId })
        addMessage(messageInput, chatId)
        setMessageInput('')
    }

    // Use Effect to receive Message
    
    useEffect(() => {

        socket.on("receive_message", (data) => {
            setMessageRecieved(data.messageInput)
            fetchMessages()
        })
}, [socket])
  
 const deleteChat = async () => {
    setIsAlertOpen(true)
  }

 const deleteChatConfirm = async () => {
        try {  
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}`, 'DELETE')
        setMessages([])
        navigate('/chats')
        } catch (error) {
            console.error("Error deleting chat:", error)
        } finally {
      setIsAlertOpen(false)
    }
    }
    
  return (
    <div className="flex flex-col h-full">
    <div className="w-full flex justify-between items-center p-2 my-2 border-b border-b-2">
        <div className="flex items-center justify-center flex-grow">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mr-2">
            {currentChat?.otherParticipant?.username}
            </h2>
            <DialogDemo />
            {isDialogOpen && <DialogDemo onClose={handleCloseDialog}/>}
        </div>
         
            <AlertOnDelete onDelete={deleteChatConfirm} />
{isAlertOpen && (
  <AlertOnDelete
    onDelete={() => setIsAlertOpen(false)}
    onClick={deleteChatConfirm}
  />
)}
    </div>
        <ScrollArea className="flex-grow w-full">
        <div className="flex flex-col gap-2 pt-1">
            {messages.map((message) => (
                <MessageView key={message._id} message={message} />
            ))}
           {messageRecieved} 
        </div> 
        </ScrollArea>
        { error && <p>{error}</p>}
        <form onSubmit={sendMessage} className="flex p-2">
            <Input value={messageInput} onChange={handleChange} type="text" placeholder="Write Message..."/>
            <Button className="ml-2" type="submit">Send</Button>
          
        </form>
    </div>
  )
}
