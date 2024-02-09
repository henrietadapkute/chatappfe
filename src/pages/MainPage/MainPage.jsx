import ChatListView from "@/components/ChatListView/ChatListView";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import 'react-router-dom'
import { useState } from "react";
import MessageListView from "@/components/MessageListView/MessageListView";
import MessageView from "@/components/MessageView/MessageView";
import {Routes, Route} from 'react-router-dom';
import NoActiveChatView from "@/components/NoActiveChatView/NoActiveChatView";
export default function MainPage() {
  const [isChatDeleted, setIsChatDeleted] = useState(false)

  const handleChatDelete = () => {
    setIsChatDeleted(true);
  }

  return (
    <div className="flex flex-col h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-grow rounded-lg border"
      >
        <ResizablePanel minSize={10} defaultSize={25}>
          <ChatListView isChatDeleted={isChatDeleted} handleChatDelete={handleChatDelete}/>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <Routes>
            <Route path="/chats/:chatId" element={<MessageListView />} />
            <Route path="/" element={<NoActiveChatView />} />
          </Routes>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
