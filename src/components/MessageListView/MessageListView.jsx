// Displays list of MessageViews()
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from "@/components/ui/input";
import { Trash2 } from 'lucide-react';
import MessageView from "@/components/MessageView/MessageView"
import { useChat } from '@/context/ChatContext'
import sendRequest from "@/utilities/send-request"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// SOCKET
import io from "socket.io-client"
const socket = io.connect("http://localhost:4000")

export default function MessageListView() {
    const navigate = useNavigate()
    const [isChatDeleted, setIsChatDeleted] = useState(false)
    const { messages, addMessage, getMessages, setMessages, chats } = useChat()
    const { chatId } = useParams()
    const currentChat = chats.find((chat) => chat.chatId === chatId)
    const [messageInput, setMessageInput] = useState('')
    const [messageRecieved, setMessageRecieved] = useState('')
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
            fetchMessages()
        }
    }, [chatId]);

    const joinRoom = (chatId) => {
        socket.emit("join_room", chatId)
    }
    
    const sendMessage = () => {
        socket.emit("send_message", { messageInput, chatId })
        addMessage(messageInput, chatId)
        setMessageInput('')
    }

    socket.on('user_disconnected', (data) => {
        console.log(`User Disconnected: ${data.userId}`)
        // going to impliment a pop up 
        
    })
    
    
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageRecieved(data.messageInput)
            setMessageInput('')
            fetchMessages()
        })
    }, [socket])


    const deleteChat = async () => {
        try {
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}`, 'DELETE')
        setMessages([])
        setIsChatDeleted(true)
        navigate('/chats')
        } catch (error) {
            console.error("Error deleting chat:", error)
        }
    }
    
    const filteredMessages = messages.filter((message) => !message.isDeleted)
    
  return (
    <div className="flex flex-col h-full">
    <div className="w-full flex justify-between items-center p-2 my-2 border-b border-b-2">
        <div className="flex items-center justify-center flex-grow">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mr-2">
            {currentChat.otherParticipant?.username}
            </h2>
            <Avatar className="flex-none">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <Button variant="destructive" onClick={deleteChat}>
            <Trash2 />
        </Button>
    </div>
        <ScrollArea className="flex-grow w-full">
        <div className="flex flex-col gap-2 pt-1">
            {messages.map((message) => (
                <MessageView key={message._id} message={message} />
            ))}
           
        </div> 
             {/* {messageRecieved}  */}
        </ScrollArea>
        
        <div className="flex p-2">
            <Input value={messageInput} onChange={(event) => {
                setMessageInput(event.target.value)
            }} type="text" placeholder="Write Message..."/>
            <Button onClick={sendMessage}>Send</Button>
           
        </div>
    </div>
  )
}
