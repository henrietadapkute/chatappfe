import SignUpForm from "@/components/SignUpForm/SignUpForm";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChat } from '@/context/ChatContext'

export default function AuthPage() {
  const { setUser } = useChat()
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-6 p-4 rounded-lg md:grid md:grid-cols-3 md:p-8">
        <h2 className="text-center text-2xl font-bold">
          <img src={`${process.env.PUBLIC_URL}/chat.png`} alt="Logo" className="mx-auto w-12 h-12" /><br/>
          C.I.C.E. <br/><br/>
          Connect Instantly, Converse Endlessly.
        </h2>
        <div className="col-span-2 flex flex-col items-center gap-6 w-full max-w-md">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="flex justify-center gap-4">
              <TabsTrigger value="account" className="w-full">Sign Up</TabsTrigger>
              <TabsTrigger value="password" className="w-full">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <SignUpForm setUser={setUser} />
            </TabsContent>
            <TabsContent value="password">
              <LoginForm setUser={setUser} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
