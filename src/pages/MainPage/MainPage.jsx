import ChatListView from "@/components/ChatListView/ChatListView";
import NavBar from "@/components/NavBar/NavBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ScrollArea } from "@/components/ui/scroll-area";

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
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
