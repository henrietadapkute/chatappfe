// Displays list of MessageViews()

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from "@/components/ui/input";
import { Trash2 } from 'lucide-react';

import MessageView from "@/components/MessageView/MessageView"
import { useChat } from '@/context/ChatContext'
import sendRequest from "@/utilities/send-request"

export default function MessageListView() {


    const [isChatDeleted, setIsChatDeleted] = useState(false)
    const { messages, addMessage, getMessages, chats } = useChat()
    const { chatId } = useParams()
    const currentChat = chats.find((chat) => chat.chatId === chatId)
    const [messageInput, setMessageInput] = useState('')
    const fetchMessages = () => {
        getMessages(chatId)
    }
    console.log(currentChat)
    const handleChange = (evt) => {
        setMessageInput(evt.target.value)
    }
    
    const handleSend = async () => {
        addMessage(messageInput, chatId)
        setMessageInput('')
    }
    
    useEffect(() => {
        fetchMessages()
    }, [chatId])

    const deleteChat = async () => {
        try {
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}`, 'DELETE')
        setMessages([])
        setIsChatDeleted(true)
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
            {currentChat.otherParticipant.username}
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
        </ScrollArea>
        <div className="flex p-2">
            <Input value={messageInput} onChange={handleChange} type="text" placeholder="Write Message..."/>
            <Button onClick={handleSend}>Send</Button>
        </div>
    </div>
  )
}
