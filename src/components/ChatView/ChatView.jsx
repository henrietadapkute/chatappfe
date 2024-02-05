// Individual chat box interface logic

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom'

export default function ChatView({ chat }) {
  return (
    <Link to={`/chats/${chat._id}`}>
    <div>
      <div className="cursor-pointer flex min-w-0 gap-x-4">
        <Avatar className="flex-none">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            Alfie Binnie
          </p>
          <p>This is the last message I sent at some point</p>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
    </Link>
  );
}
