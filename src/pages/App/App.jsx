import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import { useEffect } from "react";
import MainPage from "../MainPage/MainPage";

import { useChat } from "@/context/ChatContext";

function App() {
  const { user, setUser } = useChat();

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  return <div>{!user ? <AuthPage /> : <MainPage />}</div>;

}

export default App;
