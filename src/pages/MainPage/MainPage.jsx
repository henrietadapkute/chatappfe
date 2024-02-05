import ChatListView from "@/components/ChatListView/ChatListView";
import NavBar from "@/components/NavBar/NavBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import 'react-router-dom'

import MessageListView from "@/components/MessageListView/MessageListView";
import MessageView from "@/components/MessageView/MessageView";
import {Routes, Route} from 'react-router-dom';

export default function MainPage() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-grow rounded-lg border"
      >
        <ResizablePanel defaultSize={25}>
          <ChatListView />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <Routes>
            <Route path="/chats/:chatId" element={<MessageListView />} />
          </Routes>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
