// display a single message
import { useChat } from "@/context/ChatContext";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import sendRequest from "@/utilities/send-request";

export default function MessageView({ message, isLatest }) {
  const { user } = useChat();

  const [sender, setSender] = useState();

  const fetchOtherParticipants = async () => {
    const response = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/${message.senderId}`
    );
    setSender(response);
  };

  const baseBubbleStyle =
    "flex max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mx-3 p-4 rounded-lg text-white";
  const senderBubbleStyle = `justify-end ${baseBubbleStyle} bg-gray-500`;
  const receiverBubbleStyle = `justify-start ${baseBubbleStyle} bg-blue-500`;

  const isCurrentUser = message.senderId === user._id;

  const bubbleContainerStyle = `flex ${
    isCurrentUser ? "flex-row-reverse" : "flex-row"
  } items-end gap-2`;

  const avatarStyle = message.highlight ? "visible" : "invisible";

  const messageRef = useRef(null);

  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLatest]);

  useEffect(() => {
    fetchOtherParticipants();
  }, []);

  console.log(message);
  return (
    <div className="flex flex-col pt-1 mx-1">
      <div className={bubbleContainerStyle}>
        <div className={avatarStyle}>
          <Avatar>
            <AvatarImage src={sender?.profileImage} />
            <AvatarFallback>{sender?.username[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div
          ref={messageRef}
          className={isCurrentUser ? senderBubbleStyle : receiverBubbleStyle}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
