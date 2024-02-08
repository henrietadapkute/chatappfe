import { useState, useEffect } from "react"
import { logOut } from "@/utilities/users-service"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useChat } from "@/context/ChatContext"
import { User } from "lucide-react"

const SHEET_SIDES = ["left"]

export default function SheetSide() {
  const { user, setUser } = useChat()
  const [id, setId] = useState("")
  const selectedSide = "left"
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (user) {
      setId(user._id)
      setUsername(user.username)
      setEmail(user.email)
      setPassword(user.password)
    }
  }, [user])

  const handleUsernameChange = (e) => {
    console.log(e.target.value)
    setUsername(e.target.value)
    console.log(username)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogout = (e) => {
    logOut() 
    setUser()
    navigate('/login')
  }


  const updateUserProfile = async (updatedUserDetails) => {
    try {
      console.log(user)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile")
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!user) {
        throw new Error("User data not available")
      }
      const updatedUserDetails = {
        username,
        email,
        password,
      };

      const updatedUser = await updateUserProfile(updatedUserDetails)
      console.log("User profile updated:", updatedUser)
    } catch (error) {
      console.error("Error updating user profile:", error)
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side} style={{ display: side === selectedSide ? "block" : "none" }}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <User />
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader><div className="col-span-1">
            </div>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col justify-between h-4/5">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Username
                </Label>
                <Input
                  id="name"
                  value={username}
                  className="col-span-3"
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  value={email}
                  className="col-span-3"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password" 
                  value={password}
                  className="col-span-3"
                  onChange={handlePasswordChange} 
                />
              </div>
              <SheetClose asChild>
                <Button type="submit" onClick={handleSaveChanges}>
                  Save changes
                </Button>
              </SheetClose>
            </div>
            <SheetFooter>
            <Button type="submit" variant="destructive" onClick={handleLogout}>Log Out</Button>
            </SheetFooter>
            </div>
            <br/>
            
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
