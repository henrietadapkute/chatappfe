import { Container } from "react-bootstrap";
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import MainPage from "../MainPage/MainPage";

import { useChat } from "@/context/ChatContext";

function App() {
  const { user, setUser } = useChat()

  useEffect(() => {
    setUser(getUser())
  }, [])

  return <>{!user ? <AuthPage /> : <MainPage />}</>;
}

export default App;
