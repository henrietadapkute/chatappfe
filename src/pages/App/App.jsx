import { Container } from "react-bootstrap"
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../utilities/users-service";
import { useState } from "react";
import { Button } from '../../components/ui/button'

function App() {

  const [user, setUser] = useState(getUser())

  return (
    <>
    <AuthPage setUser={setUser}/>
    <Button>hello</Button>
    </>
  );
}

export default App;
