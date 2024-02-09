// display a single message
import { useChat } from "@/context/ChatContext";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import sendRequest from "@/utilities/send-request";

export default function MessageView({ message, lastRead, isLatest }) {
  const { user } = useChat();

  const [sender, setSender] = useState();
  const [readers, setReaders] = useState();

  const fetchSender = async () => {
    const response = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/users/${message.senderId}`
    );
    setSender(response);
  };

  const fetchReader = async () => {
    if (lastRead) {
      const promises = lastRead.map(userId =>
        sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
      );
      const users = await Promise.all(promises);
      setReaders(users);
    }
  }


  const baseBubbleStyle =
    "flex max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl py-3 px-4 rounded-lg text-white";
  const senderBubbleStyle = `justify-end ${baseBubbleStyle} bg-gray-500`;
  const receiverBubbleStyle = `justify-start ${baseBubbleStyle} bg-blue-500`;

  const isCurrentUser = message.senderId === user._id;

  const bubbleContainerStyle = `flex ${
    isCurrentUser ? "flex-row-reverse" : "flex-row"
  } items-end gap-2`;

  const avatarStyle = message.highlight ? "visible" : "invisible";

  const messageRef = useRef(null);
  const readRef = useRef(null)

  
  useEffect(() => {
    fetchSender();
    fetchReader();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (isLatest && lastRead && readRef.current) {
      readRef.current.scrollIntoView();
    } else if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLatest]);
  
  
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
      <div className="flex flex-row-reverse mr-12 mt-1">
  {readers && readers.filter(reader => reader._id !== user._id).map(reader => (
    <span className="relative flex h-5 w-5 shrink-0 overflow-hidden rounded-full">
      {reader.profileImage || reader.profileImage === "" ? (
        <img className="aspect-square h-full w-full" src={reader.profileImage} alt={reader.username} />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {reader.username[0]}
        </span>
      )}
    </span>
  ))}
</div>
    </div>
  );
}
