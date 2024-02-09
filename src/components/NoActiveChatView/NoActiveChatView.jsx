import { Plus } from "lucide-react";

export default function NoActiveChatView() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="flex">Use the  <Plus/> to create a new Chat</div>
            <div>or select a past chat to view sent messages</div>
        </div>
    )
}