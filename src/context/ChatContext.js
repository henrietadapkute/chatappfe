import { useContext, createContext, useState } from "react"
import sendRequest from "@/utilities/send-request"


const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState()
    const [currentChatId, setCurrentChatId] = useState()
    
    const getChatPreviews = async () => {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/previews`)
        setChats(response)
    }

    const getMessages = async (chatId) => {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}/messages`)
        setMessages(response)
    }

    const addChat = async (chat) => {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/create/chat`, 'POST', chat)
        getChatPreviews()
        return response
    }

    const addMessage = async (message, chatId) => {
        const newMessage = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}/messages`, 'POST', {
            content: message
        })
        setMessages([...messages, newMessage])
        getMessages(chatId)
        getChatPreviews()
    }


    const contextValue = {
        chats,
        setChats,
        messages,
        setMessages,
        user,
        setUser,
        currentChatId,
        setCurrentChatId,
        getChatPreviews,
        getMessages,
        addChat,
        addMessage,
    }

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}