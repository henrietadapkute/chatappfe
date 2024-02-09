import { useState, useEffect } from "react"
import { logOut } from "@/utilities/users-service"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ModeToggle from "../DarkModeTheme/DarkMode"
import { Textarea } from "@/components/ui/textarea"

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
  const selectedSide = "left"
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    profileImage: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({...formData, ...user})
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogout = (e) => {
    logOut() 
    setUser()
    navigate('/login')
  }


  const updateUserProfile = async (updatedUserDetails) => {
    try {
      console.log(user)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`, {
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

      const updatedUser = await updateUserProfile(formData)
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
            
            <Button className="flex justify-center items-center mx-2 w-10 h-10 border-2 border-gray-400 rounded-full hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer">
              <User />
            </Button>
          
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader><div className="col-span-1">
            <Button type="submit" onClick={handleLogout}>Log Out</Button>
            </div>
              <ModeToggle/>
              <SheetTitle>Edit profile</SheetTitle> 
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col justify-between h-4/5">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={formData.email}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
                </Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profileImage" className="text-right">
                Image
                </Label>
                <Input
                  id="profileImage"
                  value={formData.profileImage}
                  className="col-span-3"
                  onChange={handleChange}
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
