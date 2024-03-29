// Displays list of MessageViews()
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import MessageView from "@/components/MessageView/MessageView"
import DialogDemo from "@/components/OtherUserProfile/OtherUserProfile"
import AlertOnDelete from "@/components/AlertOnDelete/AlertOnDelete"
import EmojiView from "../EmojiView/EmojiView";
import { useChat } from '@/context/ChatContext'
import sendRequest from "@/utilities/send-request"

// SOCKET
import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_WEBSOCKET}`);

export default function MessageListView() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const {
    messages,
    addMessage,
    getMessages,
    setMessages,
    chats,
    setCurrentChatId,
  } = useChat();
  const currentChat = chats.find((chat) => chat.chatId === chatId);
  setCurrentChatId(chatId);

  const [messageInput, setMessageInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleEmojiSelect = (emoji) => {
     setMessageInput(messageInput + emoji)
    }

  const fetchMessages = () => {
    getMessages(chatId);
  };

  const handleChange = (evt) => {
    setError();
    setMessageInput(evt.target.value);
  };

  useEffect(() => {
    joinRoom(chatId);
    return () => {
      socket.off("receive_message");
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessages();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const joinRoom = (chatId) => {
    socket.emit("join_room", chatId);
  };

  const sendMessage = (evt) => {
    evt.preventDefault();
    if (!messageInput.trim()) {
      setError("Please enter a message");
      return;
    }
    setError();
    socket.emit("send_message", { messageInput, chatId });
    addMessage(messageInput, chatId);
    setMessageInput("");
  };

  useEffect(() => {
    socket.on("receive_message", () => {
      fetchMessages();
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const deleteChatConfirm = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/chats/${chatId}`,
        "DELETE"
      );
      setMessages([]);
      navigate("/chats");
    } catch (error) {
      console.error("Error deleting chat:", error);
    } finally {
      setIsAlertOpen(false);
    }
  };

  for (let i = 0; i < messages.length; i++) {
    const isLastMessage = i === messages.length - 1;
    const senderChangesNext =
      !isLastMessage && messages[i].senderId !== messages[i + 1].senderId;
    messages[i].highlight = isLastMessage || senderChangesNext;
  }
  const lastReadByMessageIndex = {};

messages.forEach((message, index) => {
  message.readBy.forEach(userId => {
    lastReadByMessageIndex[userId] = index;
  });
});

const indexToUsersMap = Object.entries(lastReadByMessageIndex).reduce((acc, [userId, index]) => {
  if (!acc[index]) acc[index] = [];
  acc[index].push(userId);
  return acc;
}, {});

  return (
    <div className="flex flex-col h-full">
      <div className="w-full flex justify-between items-center p-2 my-2 border-b border-b-2">
        <div className="flex items-center justify-center flex-grow">

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mr-2">
                <div className="bg-white dark:bg-black text-black dark:text-white">
            {currentChat?.otherParticipant?.username}</div>
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
        <div className="flex flex-col pt-1">
          {messages.map((message, idx) => (
            <MessageView
              key={message._id}
              message={message}
              lastRead={indexToUsersMap[idx]}
              isLatest={idx === messages.length - 1}
            />
          ))}
        </div>
      </ScrollArea>
      {error && <p>{error}</p>}
      <div className="flex mx-1">
        <EmojiView onEmojiSelect={handleEmojiSelect} />
      <form onSubmit={sendMessage} className="flex flex-grow p-2">
        <Input
          value={messageInput}
          onChange={handleChange}
          type="text"
          placeholder="Write Message..."
        />
        <Button className="ml-2" type="submit">
          Send
        </Button>
      </form>
      </div>
    </div>
  );
}
