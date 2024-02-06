import SignUpForm from "@/components/SignUpForm/SignUpForm";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChat } from '@/context/ChatContext'

export default function AuthPage() {
  const { setUser } = useChat()
  return (
    <main>
      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid">
        <div className="col-span-2 grid items-start gap-6">
          <Tabs defaultValue="account" className="w-[500px]">
            <TabsList>
              <TabsTrigger value="account">Sign Up</TabsTrigger>
              <TabsTrigger value="password">Login</TabsTrigger>
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
