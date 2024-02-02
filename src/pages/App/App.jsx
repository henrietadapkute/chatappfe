import { Container } from "react-bootstrap"
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import { useState } from "react";

function App() {

  const [user, setUser] = useState(getUser())

  return (
    <AuthPage setUser={setUser}/>
  );
}

export default App;
