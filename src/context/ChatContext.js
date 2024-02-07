import { useContext, createContext, useState } from "react"
import sendRequest from "@/utilities/send-request"


const ChatContext = createContext()

export const useChat = () => useContext(ChatContext)

export const ChatProvider = ({children}) => {
    const [chats, setChats] = useState([])
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState()
    
    const getChatPreviews = async () => {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/previews`)
        setChats(response)
    }

    const getMessages = async (chatId) => {
        const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}/messages`)
        setMessages(response)
    }

    const addChat = async (chat) => {
        await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/create/chat`, 'POST', chat)
        getChatPreviews()
    }

    const addMessage = async (message, chatId) => {
        console.log('called')
        const newMessage = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}/messages`, 'POST', {
            content: message
        })
        setMessages([...messages, newMessage])
        getMessages()
        getChatPreviews()
    }

    const contextValue = {
        chats,
        setChats,
        messages,
        setMessages,
        user,
        setUser,
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