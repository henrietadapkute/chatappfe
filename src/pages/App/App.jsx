import { Container } from "react-bootstrap";
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import MainPage from "../MainPage/MainPage";

import { useChat } from "@/context/ChatContext";

function App() {
  const { user, setUser } = useChat()
  setUser(getUser)

  return <>{!user ? <AuthPage setUser={setUser} /> : <MainPage />}</>;
}

export default App;
