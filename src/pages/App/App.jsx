import { Container } from "react-bootstrap";
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import MainPage from "../MainPage/MainPage";

function App() {
  const [user, setUser] = useState(getUser());

  return <>{!user ? <AuthPage setUser={setUser} /> : <MainPage />}</>;
}

export default App;
