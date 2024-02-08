// display a single message
import { useChat } from "@/context/ChatContext"
import { useEffect, useRef } from "react"


export default function MessageView({message, isLatest}) {

  const { user } = useChat()

  const senderStyle = "self-end max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-gray-500 text-white"
  const receiverStyle = "self-start max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg bg-blue-500 text-white"

  const messageStyle = message.senderId === user._id
  ? senderStyle
  : receiverStyle

  const messageRef = useRef(null);

  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, [isLatest]);

  console.log(isLatest)

  return (
    <>
    <div ref={messageRef} className={messageStyle}>
      {message.content}
    </div>
    </>
  )
}
