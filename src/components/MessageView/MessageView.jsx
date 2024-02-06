// display a single message
import { useChat } from "@/context/ChatContext"


export default function MessageView({message}) {

  const { user } = useChat()

  const senderStyle = "self-end max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-gray-500 text-white"
  const receiverStyle = "self-start max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-blue-500 text-white"

  const messageStyle = message.senderId === user._id
  ? senderStyle
  : receiverStyle

  return (
    <>
    <div className={messageStyle}>
      {message.content}
    </div>
    </>
  )
}
